import { useState } from "react";

export const CrearTrabajadorCard = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    puesto: "",
    telefono: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const crear = () => {
    const campos = Object.entries(form);
    const camposVacios = campos.filter(([_, v]) => !v);
    if (camposVacios.length > 0) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    onCreate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="p-6 space-y-4 bg-white shadow-2xl rounded-2xl w-96">
        <h2 className="text-2xl font-bold text-center">Crear Trabajador</h2>

        <input name="nombre" value={form.nombre} onChange={cambiar} placeholder="Nombre" className="w-full p-2 border rounded"/>
        <input name="apellido" value={form.apellido} onChange={cambiar} placeholder="Apellido" className="w-full p-2 border rounded" />
        <input name="puesto" value={form.puesto} onChange={cambiar} placeholder="Puesto" className="w-full p-2 border rounded" />
        <input name="telefono" value={form.telefono} onChange={cambiar} placeholder="Teléfono" className="w-full p-2 border rounded" />
        <input name="email" value={form.email} onChange={cambiar} placeholder="Email" type="email" className="w-full p-2 border rounded" />
        <input name="password" value={form.password} onChange={cambiar} placeholder="Contraseña" type="password" className="w-full p-2 border rounded"/>

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
            className="px-4 py-2 text-black bg-gray-400 rounded hover:bg-blue-500"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};
