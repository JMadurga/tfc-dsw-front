import { useEffect, useState } from "react";
import ReposicionService from "../../Services/ReposicionService";
import ProductoService from "../../Services/ProductoService";

const STOCK_FIELD = "stock";

export const Notificaciones = () => {
  const [repos, setRepos] = useState([]);
  const [open, setOpen] = useState(() => new Set());
  const [processingId, setProcessingId] = useState(null);
  const [productsCache, setProductsCache] = useState({}); 
  
  useEffect(() => {
    (async () => {
      try {
        const data = await ReposicionService.getAll({ includeItems: true });
        setRepos(data);
      } catch (e) {
        console.error(e);
        window.alert("No se pudieron cargar las reposiciones");
      }
    })();
  }, []);

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const normalizeProducts = (res) => {
    if (Array.isArray(res)) return res;
    if (res?.rows && Array.isArray(res.rows)) return res.rows;
    if (res?.data && Array.isArray(res.data)) return res.data;
    return [];
  };

  const ensureProductsInCache = async (neededIds) => {
    const missing = neededIds.filter((id) => productsCache[id] == null);
    if (missing.length === 0) return productsCache; 

    const limit = 200;
    let offset = 0;
    const found = { ...productsCache };

    while (missing.some((id) => found[id] == null)) {
      const page = await ProductoService.getAll(limit, offset);
      const list = normalizeProducts(page);
      if (list.length === 0) break;

      for (const p of list) {
        const idp = p.id_producto; 
        if (idp != null && missing.includes(idp)) {
          found[idp] = p;
        }
      }
      offset += limit;
    }

    const stillMissing = missing.filter((id) => found[id] == null);
    if (stillMissing.length > 0) {
      throw new Error(
        `No se encontraron en el listado estos productos: ${stillMissing.join(", ")}`
      );
    }

    setProductsCache(found);
    return found; 
  };

  const completar = async (repo) => {
    if (processingId) return;
    if (!window.confirm("¿Marcar como completada? Se restará el stock y se eliminará la lista.")) return;

    setProcessingId(repo.id_reposicion);
    try {
      const items = repo.items || [];

      if (items.length === 0) {
        await ReposicionService.remove(repo.id_reposicion);
        setRepos((prev) => prev.filter((r) => r.id_reposicion !== repo.id_reposicion));
        return;
      }
      const idsNecesarios = Array.from(new Set(items.map((it) => it.id_producto)));
      const cache = await ensureProductsInCache(idsNecesarios);

      const updates = []; 
      for (const it of items) {
        const prod = (cache && cache[it.id_producto]) ?? productsCache[it.id_producto];
        const actual = Number((prod ?? {})[STOCK_FIELD]);
        if (!Number.isFinite(actual)) {
          throw new Error(`Producto ${it.id_producto}: campo "${STOCK_FIELD}" inválido`);
        }
        const nuevo = actual - Number(it.unidades);
        if (nuevo < 0) {
          throw new Error(
            `Stock insuficiente para producto ${it.id_producto} (${actual} - ${it.unidades})`
          );
        }
        updates.push({ id_producto: it.id_producto, nuevo });
      }

      for (const u of updates) {
        await ProductoService.update(u.id_producto, { [STOCK_FIELD]: u.nuevo });
        setProductsCache((prev) => ({
          ...prev,
          [u.id_producto]: { ...(prev[u.id_producto] || {}), [STOCK_FIELD]: u.nuevo },
        }));
      }
      for (const it of items) {
        await ReposicionService.removeItem(repo.id_reposicion, it.id_reposicion_item);
      }
      await ReposicionService.remove(repo.id_reposicion);

      setRepos((prev) => prev.filter((r) => r.id_reposicion !== repo.id_reposicion));
      setOpen((prev) => {
        const s = new Set(prev);
        s.delete(repo.id_reposicion);
        return s;
      });
    } catch (e) {
      console.error(e);
      window.alert(e.message || "No se pudo completar la reposición.");
    } finally {
      setProcessingId(null);
    }
  };

  if (repos.length === 0) {
    return (
      <div className="p-6 border rounded-md border-slate-200 text-slate-500">
        No hay listas de reposición pendientes.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {repos.map((r) => {
        const id = r.id_reposicion;
        const isOpen = open.has(id);

        return (
          <div key={id} className="overflow-hidden border rounded-md border-slate-200">
            <button
              className="flex items-start justify-between w-full p-4 text-left hover:bg-slate-50"
              onClick={() => toggle(id)}
              disabled={processingId === id}
              aria-expanded={isOpen}
            >
              <div>
                <h3 className="font-medium text-slate-900">Reposición #{id}</h3>
                <p className="text-xs text-slate-500">
                  {r.trabajador && (
                    <>
                      Creada por: {r.trabajador.nombre} {r.trabajador.apellido} · {r.trabajador.email}
                      <br />
                    </>
                  )}
                  {r.creacion && <>Fecha: {new Date(r.creacion).toLocaleString()}</>}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden>
                  ⌄
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    completar(r);
                  }}
                  className="px-2 text-xl leading-none text-slate-500 hover:text-red-600 disabled:opacity-50"
                  title="Marcar como completada"
                  aria-label="Completar y eliminar reposición"
                  disabled={processingId === id}
                >
                  ×
                </button>
              </div>
            </button>

            {isOpen && (
              <div className="p-4 border-t border-slate-200">
                {!r.items || r.items.length === 0 ? (
                  <div className="text-sm text-slate-500">No hay productos en esta reposición.</div>
                ) : (
                  <ul className="pl-5 space-y-1 text-sm list-disc text-slate-800">
                    {r.items.map((it) => (
                      <li key={it.id_reposicion_item}>
                        {it.producto?.nombre || `Producto ${it.id_producto}`} — {it.unidades} u.
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
