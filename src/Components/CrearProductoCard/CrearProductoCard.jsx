import { useState, useEffect } from "react";
import CategoriaService from "../../Services/CategoriaService";
export const CrearProductoCard = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    stock: "",
    stock_minimo: "",
    id_categoria:"",
  });
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState([]);
  
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await CategoriaService.getAll();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategorias();
  }, []);
  
  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const crear = () => {
    const { nombre, descripcion, stock, stock_minimo, id_categoria} = form;

    if (!nombre || !descripcion || stock === "" || stock_minimo === ""|| !id_categoria) {
      setError("Todos los campos son obligatorios");
      return;
    }
  if ( isNaN(stock) || isNaN(stock_minimo) || Number(stock) < 0 || Number(stock_minimo) < 0)
  {
    setError("Stock y stock mínimo deben ser números no negativos");
    return;
  }

    setError("");
    onCreate({ ...form, stock: Number(stock), stock_minimo: Number(stock_minimo),id_categoria: Number(id_categoria) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="p-6 space-y-4 bg-white shadow-2xl rounded-2xl w-96">
        <h2 className="text-2xl font-bold text-center">Crear Producto</h2>

        <input name="nombre" value={form.nombre} onChange={cambiar} placeholder="Nombre" className="w-full p-2 border rounded"/>
        <input name="descripcion"  value={form.descripcion} onChange={cambiar} placeholder="Descripción" className="w-full p-2 border rounded"/>
        <input name="stock" type="number" value={form.stock} onChange={cambiar} placeholder="Stock" className="w-full p-2 border rounded"/>
        <input name="stock_minimo" type="number" value={form.stock_minimo} onChange={cambiar} placeholder="Stock mínimo" className="w-full p-2 border rounded"/>
        <select name="id_categoria" value={form.id_categoria} onChange={cambiar} className="w-full p-2 border rounded">
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-between pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
          <button onClick={crear} className="px-4 py-2 text-black bg-gray-400 rounded hover:bg-blue-500">Crear</button>
        </div>
      </div>
    </div>
  );
};
