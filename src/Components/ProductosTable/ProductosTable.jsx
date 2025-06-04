import { useEffect, useState } from "react";
import ProductoService from "../../Services/ProductoService";
import CategoriaService from "../../Services/CategoriaService";
import LapizIcon from "../../Media/LapizIcon.png";
import BasuraIcon from "../../Media/BasuraIcon.png";
import { UpdateCard } from "../UpdateCard/UpdateCard";

export const ProductosTable = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);

  const loadData = async () => {
    try {
      const [productosData, categoriasData] = await Promise.all([
        ProductoService.getAll(),
        CategoriaService.getAll(),
      ]);
      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error al cargar productos o categorías:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ProductoService.delete(id);
      loadData();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleUpdate = async (productoEditado) => {
    try {
      await ProductoService.update(productoEditado.id_producto, productoEditado);
      setEditando(null);
      loadData();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const getCategoriaNombre = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nombre : "Sin categoría";
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-4 overflow-x-auto font-ibm">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Stock mínimo</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Update</th>
            <th className="p-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id_producto}>
              <td className="p-2 border">{p.nombre}</td>
              <td className="p-2 border">{p.stock}</td>
              <td className="p-2 border">{p.stock_minimo}</td>
              <td className="p-2 border">{getCategoriaNombre(p.id_categoria)}</td>
              <td className="p-2 text-center border">
                <img src={LapizIcon} alt="Editar" className="w-5 h-5 mx-auto cursor-pointer" onClick={() => setEditando(p)} />
              </td>
              <td className="p-2 text-center border">
                <img src={BasuraIcon} alt="Eliminar" className="w-5 h-5 mx-auto cursor-pointer" onClick={() => handleDelete(p.id_producto)} />
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editando && (
        <UpdateCard
          producto={editando}
          onClose={() => setEditando(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};


