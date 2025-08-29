import { useEffect, useState } from "react";

export const UpdateReposicionCard = ({ item, onClose, onUpdate }) => {
  const [unidades, setUnidades] = useState(1);

  useEffect(() => {
    if (item) setUnidades(item.unidades ?? 1);
  }, [item]);

  const guardar = () => {
    const n = Number(unidades);
    if (!Number.isInteger(n) || n <= 0) {
      alert("Las unidades deben ser un entero > 0");
      return;
    }
    onUpdate(n);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-ibm">
      <div className="p-6 space-y-4 bg-white shadow-2xl w-96 rounded-2xl">
        <h2 className="text-xl font-bold text-center">Editar unidades</h2>

        <p className="text-sm text-slate-600">
          {item?.producto?.nombre || `Producto ${item?.id_producto}`}
        </p>

        <input
          type="number"
          min={1}
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="flex justify-between pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={guardar} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
