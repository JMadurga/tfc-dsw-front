import { useEffect, useState } from "react";
import ReposicionService from "../../Services/ReposicionService";
import LapizIcon from "../../Media/LapizIcon.png";
import BasuraIcon from "../../Media/BasuraIcon.png";
import { UpdateReposicionItemCard } from "../UpdateReposicionItemCard/UpdateReposicionItemCard";

export const ReposicionesTable = () => {
  const [repos, setRepos] = useState([]);
  const [openId, setOpenId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [editandoItem, setEditandoItem] = useState(null); 
  const [itemForm, setItemForm] = useState({ id_producto: "", unidades: "" }); 

  const loadRepos = async () => {
    setLoading(true);
    try {
      const data = await ReposicionService.getAll({ includeItems: true });
      setRepos(data);
    } catch (e) {
      console.error(e);
      alert("No se pudieron cargar las reposiciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRepos(); }, [reload]);

  const toggle = (id) => {
    setOpenId((cur) => (cur === id ? null : id));
    setItemForm({ id_producto: "", unidades: "" });
  };

  const deleteRepo = async (id) => {
    if (!confirm("¿Eliminar esta reposición?")) return;
    try {
      await ReposicionService.remove(id);
      setRepos((prev) => prev.filter((r) => r.id_reposicion !== id));
      if (openId === id) setOpenId(null);
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar la reposición");
    }
  };

  const deleteItem = async (repoId, itemId) => {
    if (!confirm("¿Eliminar este item?")) return;
    try {
      await ReposicionService.removeItem(repoId, itemId);
      setRepos((prev) =>
        prev.map((r) =>
          r.id_reposicion === repoId
            ? { ...r, items: (r.items || []).filter((it) => it.id_reposicion_item !== itemId) }
            : r
        )
      );
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el item");
    }
  };

  const addItem = async (repoId) => {
    const id_producto = Number(itemForm.id_producto);
    const unidades = Number(itemForm.unidades);
    if (!id_producto || !Number.isInteger(unidades) || unidades <= 0) {
      alert("Indica un id_producto válido y unidades (>0)");
      return;
    }
    try {
      await ReposicionService.addItem(repoId, { id_producto, unidades });
      setItemForm({ id_producto: "", unidades: "" });
      await loadRepos();
      setOpenId(repoId);
    } catch (e) {
      console.error(e);
      alert(e.message || "No se pudo añadir el item");
    }
  };

  const confirmarUpdateItem = async (repoId, item, nuevasUnidades) => {
    try {
      await ReposicionService.updateItem(repoId, item.id_reposicion_item, nuevasUnidades);
      setRepos((prev) =>
        prev.map((r) =>
          r.id_reposicion === repoId
            ? {
                ...r,
                items: (r.items || []).map((it) =>
                  it.id_reposicion_item === item.id_reposicion_item ? { ...it, unidades: nuevasUnidades } : it
                ),
              }
            : r
        )
      );
      setEditandoItem(null);
    } catch (e) {
      console.error(e);
      alert("No se pudo actualizar el item");
    }
  };

  if (loading) return <div className="p-4 font-ibm text-slate-500">Cargando reposiciones…</div>;

  return (
    <div className="p-4 overflow-x-auto font-ibm">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left border">ID</th>
            <th className="p-2 text-left border">Trabajador</th>
            <th className="p-2 text-left border">Fecha</th>
            <th className="p-2 text-center border"># Items</th>
            <th className="p-2 text-center border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((r) => {
            const id = r.id_reposicion;
            const items = r.items || [];
            const abierto = openId === id;

            return (
              <Fragment key={id}>
                <tr>
                  <td className="p-2 border">{id}</td>
                  <td className="p-2 border">
                    {r.trabajador
                      ? `${r.trabajador.nombre} ${r.trabajador.apellido} (${r.trabajador.email})`
                      : "—"}
                  </td>
                  <td className="p-2 border">
                    {r.creacion ? new Date(r.creacion).toLocaleString() : "—"}
                  </td>
                  <td className="p-2 text-center border">{items.length}</td>
                  <td className="p-2 text-center border">
                    <button
                      onClick={() => toggle(id)}
                      className="px-2 py-1 mr-3 text-xs rounded bg-slate-200 hover:bg-slate-300"
                    >
                      {abierto ? "Ocultar" : "Ver"}
                    </button>
                    <img
                      src={BasuraIcon}
                      alt="Eliminar reposición"
                      className="inline-block w-5 h-5 align-middle cursor-pointer"
                      onClick={() => deleteRepo(id)}
                      title="Eliminar reposición"
                    />
                  </td>
                </tr>

                {abierto && (
                  <tr>
                    <td colSpan={5} className="p-0 border-t">
                      <div className="p-3 bg-gray-50">
                        {/* Subtabla */}
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="p-2 text-left border">ID Item</th>
                              <th className="p-2 text-left border">ID Producto</th>
                              <th className="p-2 text-left border">Producto</th>
                              <th className="p-2 text-center border">Unidades</th>
                              <th className="p-2 text-center border">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.length === 0 ? (
                              <tr>
                                <td className="p-2 text-center border text-slate-500" colSpan={5}>
                                  No hay productos en esta reposición.
                                </td>
                              </tr>
                            ) : (
                              items.map((it) => (
                                <tr key={it.id_reposicion_item}>
                                  <td className="p-2 border">{it.id_reposicion_item}</td>
                                  <td className="p-2 border">{it.id_producto}</td>
                                  <td className="p-2 border">
                                    {it.producto?.nombre || `Producto ${it.id_producto}`}
                                  </td>
                                  <td className="p-2 text-center border">{it.unidades}</td>
                                  <td className="p-2 space-x-3 text-center border">
                                    <img
                                      src={LapizIcon}
                                      alt="Editar"
                                      title="Editar unidades"
                                      className="inline-block w-5 h-5 align-middle cursor-pointer"
                                      onClick={() => setEditandoItem({ repoId: id, item: it })}
                                    />
                                    <img
                                      src={BasuraIcon}
                                      alt="Eliminar"
                                      title="Eliminar item"
                                      className="inline-block w-5 h-5 align-middle cursor-pointer"
                                      onClick={() => deleteItem(id, it.id_reposicion_item)}
                                    />
                                  </td>
                                </tr>
                              ))
                            )}

                            {/* Añadir item */}
                            <tr>
                              <td className="p-2 italic border text-slate-500" colSpan={2}>
                                Añadir producto
                              </td>
                              <td className="p-2 border">
                                <input
                                  type="number"
                                  placeholder="ID Producto"
                                  className="w-40 px-2 py-1 border rounded"
                                  value={itemForm.id_producto}
                                  onChange={(e) =>
                                    setItemForm((f) => ({ ...f, id_producto: e.target.value }))
                                  }
                                />
                              </td>
                              <td className="p-2 text-center border">
                                <input
                                  type="number"
                                  min={1}
                                  placeholder="Unidades"
                                  className="w-24 px-2 py-1 text-center border rounded"
                                  value={itemForm.unidades}
                                  onChange={(e) =>
                                    setItemForm((f) => ({ ...f, unidades: e.target.value }))
                                  }
                                />
                              </td>
                              <td className="p-2 text-center border">
                                <button
                                  onClick={() => addItem(id)}
                                  className="px-3 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                  Añadir
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>

      {editandoItem && (
        <UpdateReposicionItemCard
          item={editandoItem.item}
          onClose={() => setEditandoItem(null)}
          onUpdate={(n) => confirmarUpdateItem(editandoItem.repoId, editandoItem.item, n)}
        />
      )}
    </div>
  );
};

const Fragment = ({ children }) => <>{children}</>;
