import { useState } from "react";
import ReposicionService from "../../Services/ReposicionService";

export const CrearReposicionCard = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({ id_trabajador: "", creacion: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const crear = async () => {
    const id_trabajador = Number(form.id_trabajador);
    if (!id_trabajador) {
      setError("id_trabajador es obligatorio (número).");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await ReposicionService.create({
        id_trabajador,
        creacion: form.creacion || undefined,
      });
      const repo = res.reposicion ?? res;
      onCreate?.(repo);
      onClose?.();
    } catch (e) {
      console.error(e);
      setError(e.message || "No se pudo crear la reposición");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="p-6 space-y-4 bg-white shadow-2xl rounded-2xl w-96 font-ibm">
        <h2 className="text-2xl font-bold text-center">Crear Reposición</h2>

        <input
          name="id_trabajador"
          value={form.id_trabajador}
          onChange={cambiar}
          placeholder="ID Trabajador"
          type="number"
          className="w-full p-2 border rounded"
        />
        <input
          name="creacion"
          value={form.creacion}
          onChange={cambiar}
          placeholder="Fecha (opcional)"
          type="datetime-local"
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-between pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={crear}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creando…" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
};
