import { useEffect, useState } from "react";
import ClaseVinoService from "../../Services/ClaseVinoService";
import LapizIcon from "../../Media/LapizIcon.png";
import BasuraIcon from "../../Media/BasuraIcon.png";
import { UpdateClaseVinoCard } from "../UpdateClasevinoCard/UpdateClasevinoCard";

export const ClasesVinoTable = () => {
  const [clasesVino, setClasesVino] = useState([]);
  const [editando, setEditando] = useState(null);

  const loadClasesVino = async () => {
    try {
      const data = await ClaseVinoService.getAll();
      setClasesVino(data);
    } catch (error) {
      console.error("Error al cargar las clases de vino", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ClaseVinoService.remove(id);
      setClasesVino((prev) => prev.filter((c) => c.id_clase_vino !== id));
    } catch (error) {
      console.error("Error al eliminar la Clase de Vino", error);
    }
  };

  const handleUpdate = async (claseActualizada) => {
    try {
      // Solo enviamos los campos editables
      await ClaseVinoService.update(claseActualizada.id_clase_vino, {
        nombre: claseActualizada.nombre,
        descripcion: claseActualizada.descripcion,
      });
      setEditando(null);
      loadClasesVino();
    } catch (error) {
      console.error("Error al actualizar la Clase de Vino", error);
    }
  };

  useEffect(() => {
    loadClasesVino();
  }, []);

  return (
    <div className="p-4 overflow-x-auto font-ibm">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Update</th>
            <th className="p-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {clasesVino.map((c) => (
            <tr key={c.id_clase_vino}>
              <td className="p-2 border">{c.nombre}</td>
              <td className="p-2 border">{c.descripcion}</td>
              <td className="p-2 text-center border">
                <img
                  src={LapizIcon}
                  alt="Editar"
                  className="w-5 h-5 mx-auto cursor-pointer"
                  onClick={() => setEditando(c)}
                />
              </td>
              <td className="p-2 text-center border">
                <img
                  src={BasuraIcon}
                  alt="Eliminar"
                  className="w-5 h-5 mx-auto cursor-pointer"
                  onClick={() => handleDelete(c.id_clase_vino)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <UpdateClaseVinoCard
          clase={editando}
          onClose={() => setEditando(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};
