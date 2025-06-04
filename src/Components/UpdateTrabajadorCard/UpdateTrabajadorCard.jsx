import { useEffect, useState } from "react";

export const UpdateTrabajadorCard = ({ trabajador, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    puesto: "",
    telefono: "",
  });

  useEffect(() => {
    if (trabajador) {
      setForm({
        nombre: trabajador.nombre || "",
        apellido: trabajador.apellido || "",
        puesto: trabajador.puesto || "",
        telefono: trabajador.telefono || "",
      });
    }

  }, [trabajador]);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const actualizar = () => {
    onUpdate({ id_trabajador: trabajador.id_trabajador
      , ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm font-ibm">
      <div className="p-6 space-y-3 bg-white rounded-xl w-96">
        <h2 className="text-xl font-bold text-center">Editar Trabajador</h2>

        <input name="nombre" value={form.nombre} onChange={cambiar} placeholder="Nombre" className="w-full p-2 border rounded" />
        <input name="apellido" value={form.apellido} onChange={cambiar} placeholder="Apellido" className="w-full p-2 border rounded" />
        <input name="puesto" value={form.puesto} onChange={cambiar} placeholder="Puesto" className="w-full p-2 border rounded" />
        <input name="telefono" value={form.telefono} onChange={cambiar} placeholder="Teléfono" className="w-full p-2 border rounded" />

        <div className="flex justify-between pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button onClick={actualizar} className="px-4 py-2 text-white bg-blue-500 rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
};
