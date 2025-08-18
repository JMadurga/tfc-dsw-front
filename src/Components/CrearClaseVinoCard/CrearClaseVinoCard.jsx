import { useState } from "react";

export const CrearClaseVinoCard = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
  });

  const [error, setError] = useState("");

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const crear = () => {
    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setError("");
    onCreate({
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") crear();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="p-6 space-y-4 bg-white shadow-2xl w-96 rounded-2xl" onKeyDown={onKeyDown}>
        <h2 className="text-2xl font-bold text-center">Crear Clase de Vino</h2>

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
          placeholder="Descripción (opcional)"
          className="w-full p-2 border rounded resize-y min-h-24"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-between pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={crear}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!form.nombre.trim()}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};
