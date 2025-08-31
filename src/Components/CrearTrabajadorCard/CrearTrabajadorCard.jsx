import { useState } from "react";

const PUESTOS = ["administrador", "jefe-almacen", "mozo-almacen"];

// formatea una Date o string a "YYYY-MM-DD" sin problemas de zona horaria
function toDateOnly(input) {
  if (typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  const d = new Date(input);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayDateOnly() {
  return toDateOnly(new Date());
}

export const CrearTrabajadorCard = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    puesto: "",              // obligatorio y debe ser uno de PUESTOS
    telefono: "",
    direccion: "",           // opcional en BD, pero lo incluimos por si acaso
    email: "",
    password: "",
    fecha_contratacion: todayDateOnly(), // obligatorio en BD
  });

  const [error, setError] = useState("");

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const crear = () => {
    // Validaciones mínimas del front
    const { nombre, apellido, email, password, puesto, fecha_contratacion } = form;

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !password || !puesto) {
      setError("Todos los campos obligatorios deben completarse.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Email inválido.");
      return;
    }

    if (!PUESTOS.includes(puesto)) {
      setError("Puesto inválido.");
      return;
    }

    if (!fecha_contratacion) {
      setError("La fecha de contratación es obligatoria.");
      return;
    }

    // Normaliza fecha a YYYY-MM-DD
    let fechaNormalized;
    try {
      fechaNormalized = toDateOnly(fecha_contratacion);
    } catch {
      setError("Fecha de contratación inválida (usa YYYY-MM-DD).");
      return;
    }

    setError("");

    // Construir payload EXACTO para el backend
    const payload = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim(),
      password, // el hook beforeCreate hashea secure_password
      telefono: form.telefono?.trim() || null,   // opcional en BD
      direccion: form.direccion?.trim() || null, // opcional en BD
      puesto,
      fecha_contratacion: fechaNormalized,       // NOT NULL + DATE/DATEONLY
    };

    onCreate(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="p-6 space-y-4 bg-white shadow-2xl rounded-2xl w-96">
        <h2 className="text-2xl font-bold text-center">Crear Trabajador</h2>

        <input name="nombre" value={form.nombre} onChange={cambiar} placeholder="Nombre *" className="w-full p-2 border rounded" />
        <input name="apellido" value={form.apellido} onChange={cambiar} placeholder="Apellido *" className="w-full p-2 border rounded" />

        
        <select
          name="puesto"
          value={form.puesto}
          onChange={cambiar}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecciona puesto *</option>
          {PUESTOS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <input name="telefono" value={form.telefono} onChange={cambiar} placeholder="Teléfono" className="w-full p-2 border rounded" />
        <input name="direccion" value={form.direccion} onChange={cambiar} placeholder="Dirección" className="w-full p-2 border rounded" />

        <input name="email" value={form.email} onChange={cambiar} placeholder="Email *" type="email" className="w-full p-2 border rounded" />
        <input name="password" value={form.password} onChange={cambiar} placeholder="Contraseña *" type="password" className="w-full p-2 border rounded" />

        
        <input
          name="fecha_contratacion"
          type="date"
          value={form.fecha_contratacion}
          onChange={cambiar}
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-between pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={crear} className="px-4 py-2 text-black bg-gray-400 rounded hover:bg-blue-500">
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};
