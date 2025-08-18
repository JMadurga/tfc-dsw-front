import { useState, useEffect } from "react";

export const UpdateClaseVinoCard = ({ clase, onClose, onUpdate }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    if (!clase) return;
    setForm({
      nombre: clase.nombre ?? "",
      descripcion: clase.descripcion ?? "",
    });
  }, [clase]);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const guardar = () => {
    // Conserva el id y envía los nuevos valores
    onUpdate({ ...clase, ...form });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && form.nombre.trim()) guardar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-ibm">
      <div className="p-6 space-y-3 bg-white w-96 rounded-xl" onKeyDown={onKeyDown}>
        <h2 className="text-xl font-bold text-center">Editar Clase de Vino</h2>

        <input
          name="nombre"
          value={form.nombre}
          onChange={cambiar}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          autoFocus
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={cambiar}
          placeholder="Descripción"
          className="w-full p-2 border rounded resize-y min-h-24"
        />

        <div className="flex justify-between pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button
            onClick={guardar}
            className="px-4 py-2 text-white bg-blue-600 rounded disabled:opacity-50"
            disabled={!form.nombre.trim()}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
