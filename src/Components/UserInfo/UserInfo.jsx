import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (e) {
      console.error("Token inválido:", e);
    }
  }, []);

  const Field = ({ label, value, className = "" }) => (
    <div className={`block ${className}`}>
      <p className="text-sm text-slate-600">{label}</p>
      <p className="w-full py-2 mt-1 border-b border-slate-300 text-slate-900">
        {value ?? <span className="text-slate-400">—</span>}
      </p>
    </div>
  );


  return (
    <section aria-labelledby="titulo-usuario">
      <h2 id="titulo-usuario" className="sr-only">Información del usuario</h2>

      <div className="grid grid-cols-12 gap-x-10 gap-y-8">
        <Field label="Nombre" value={user?.nombre} className="col-span-12 md:col-span-6" />
        <Field label="Apellido" value={user?.apellido} className="col-span-12 md:col-span-6" />
        <Field label="Correo" value={user?.email} className="col-span-12" />
        <Field
          label="Fecha de contratación"
          value={
            user?.fecha_contratacion
              ? new Date(user?.fecha_contratacion).toLocaleDateString()
              : undefined
          }
          className="col-span-12 md:col-span-6"
        />
        <Field label="Teléfono" value={user?.telefono} className="col-span-12 md:col-span-6" />
        <Field label="Dirección" value={user?.direccion} className="col-span-12" />
      </div>
    </section>
  );
};
