import { useEffect, useState } from "react";
import TrabajadorService from "../../Services/TrabajadorService";
import LapizIcon from "../../Media/LapizIcon.png";
import BasuraIcon from "../../Media/BasuraIcon.png";
import { UpdateTrabajadorCard } from "../UpdateTrabajadorCard/UpdateTrabajadorCard";

 export const TrabajadoresTable = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [editando, setEditando] = useState(null);

  const loadTrabajadores = async () => {
    try {
      const data = await TrabajadorService.getAll();
      setTrabajadores(data);
    } catch (error) {
      console.error("Error al cargar trabajadores", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await TrabajadorService.remove(id);
      setTrabajadores(prev => prev.filter(t => t.id_trabajador !== id));
    } catch (error) {
      console.error("Error al eliminar trabajador", error);
    }
  };

  const handleUpdate = async (trabajadorActualizado) => {
    try {
      await TrabajadorService.update(trabajadorActualizado.id_trabajador, trabajadorActualizado);
      setEditando(null);
      loadTrabajadores();
    } catch (error) {
      console.error("Error al actualizar trabajador", error);
    }
  };

  useEffect(() => {
    loadTrabajadores();
  }, []);

  return (
    <div className="p-4 overflow-x-auto font-ibm">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">Puesto</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Update</th>
            <th className="p-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((t) => (
            <tr key={t.id_trabajador}>
              <td className="p-2 border">{t.nombre}</td>
              <td className="p-2 border">{t.apellido}</td>
              <td className="p-2 border">{t.puesto}</td>
              <td className="p-2 border">{t.telefono}</td>
              <td className="p-2 text-center border">
                <img src={LapizIcon} alt="Editar" className="w-5 h-5 mx-auto cursor-pointer" onClick={() => setEditando(t)} />
              </td>
              <td className="p-2 text-center border">
                <img src={BasuraIcon} alt="Eliminar" className="w-5 h-5 mx-auto cursor-pointer" onClick={() => handleDelete(t.id_trabajador)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <UpdateTrabajadorCard 
          trabajador={editando}
          onClose={() => setEditando(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};


