 import { useState, useEffect } from "react";

export const UpdateCard = ({ producto, onClose, onUpdate }) =>{
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        stock: 0,
        stock_minimo: 0,
    });

    useEffect(() => {
        setForm({
        nombre: producto.nombre,
        descripcion: producto.descripcion || "",
        stock: producto.stock,
        stock_minimo: producto.stock_minimo,
        });
    }, [producto]);

    const cambiar = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const actualizar = () => {
        onUpdate({ ...producto, ...form });
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm font-ibm">
            <div className="p-6 space-y-3 bg-white rounded-xl w-96">
                <h2 className="text-xl font-bold text-center">Editar Producto</h2>
                
                <input name="nombre" value={form.nombre} onChange={cambiar} placeholder="Nombre" className="w-full p-2 border rounded"/>
                <input name="descripcion" value={form.descripcion} onChange={cambiar} placeholder="Descripción" className="w-full p-2 border rounded"/>
                <input name="stock_minimo" type="number" value={form.stockMin} onChange={cambiar} placeholder="Stock Mín" className="w-full p-2 border rounded"/>
                <input name="stock" type="number" value={form.stock} onChange={cambiar} placeholder="Stock" className="w-full p-2 border rounded"/>
                
                <div className="flex justify-between pt-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded"> Cancelar </button>
                    <button onClick={actualizar} className="px-4 py-2 text-white bg-blue-500 rounded"> Guardar </button>
                </div>
            </div>
        </div>
  );
}
