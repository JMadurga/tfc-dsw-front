
import { useEffect, useMemo, useRef, useState } from "react";
import ProductoService from "../../Services/ProductoService";

// pequeña utilidad de debounce
const useDebounced = (value, delay = 300) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};

const buscarProductosPorNombre = async (query, { limit = 150, maxPages = 10, maxMatches = 25 } = {}) => {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  let offset = 0, page = 0;
  const matches = [];
  while (page < maxPages && matches.length < maxMatches) {
    const batch = await ProductoService.getAll(limit, offset);
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const p of batch) {
      if (p?.nombre?.toLowerCase().includes(q)) matches.push(p);
      if (matches.length >= maxMatches) break;
    }
    if (batch.length < limit) break; 
    offset += limit;
    page += 1;
  }
  return matches;
};

export const ProductoAutocomplete = ({ onSelect, placeholder = "Busca producto…" }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounced(query, 300);
  const cacheRef = useRef({}); // cache por query

  useEffect(() => {
    const run = async () => {
      const q = debounced.trim().toLowerCase();
      if (q.length < 2) { setOptions([]); return; }
      if (cacheRef.current[q]) { setOptions(cacheRef.current[q]); return; }
      setLoading(true);
      try {
        const res = await buscarProductosPorNombre(q);
        cacheRef.current[q] = res;
        setOptions(res);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [debounced]);

  const wrapperRef = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOptions((opts) => (opts.length ? [] : opts));
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded"
      />
      {loading && (
        <div className="absolute right-2 top-1.5 text-xs text-slate-400 select-none">buscando…</div>
      )}
      {options.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white border rounded shadow-sm max-h-56">
          {options.map((p) => (
            <li
              key={p.id_producto}
              className="px-2 py-1 cursor-pointer hover:bg-slate-100"
              onClick={() => { onSelect(p); setOptions([]); setQuery(`${p.nombre} (#${p.id_producto})`); }}
              title={`#${p.id_producto}`}
            >
              {p.nombre} <span className="text-slate-500">#{p.id_producto}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
