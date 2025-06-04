import { use, useEffect, useState } from "react"
import ProductoService from '../../Services/ProductoService';
import CategoriaService from "../../Services/CategoriaService";
import ClaseVinoService from "../../Services/ClaseVinoService";

export const EstSelected =({ nombre }) =>{
    const [productos , setProductos] = useState([])
    const [categorias, setCategorias] =useState([])
    const [claseVinos, setClaseVinos] = useState([])
    
    const fetch = async () =>{
        const productosData = await ProductoService.getAll();
        setProductos(productosData)           
        const categoriasData = await CategoriaService.getAll();
        setCategorias(categoriasData)
        const claseVinoData = await ClaseVinoService.getAll();
        setClaseVinos(claseVinoData)
        console.log("ClasesVinos", claseVinoData)
    }
    
    useEffect(() => {
        fetch();
    }, []);
    
    return(
        <div>
            <div className="py-2 text-lg font-bold text-center bg-blue-200 rounded-t font-ibm">
               {nombre}
            </div>
            <table className="w-full border-collapse table-fixed">
                <thead>
                    <tr className="text-left bg-gray-100">
                        <th className="w-1/3 px-4 py-2 border">Nombre</th>
                        <th className="w-1/3 px-4 py-2 border">Stock Mínimo</th>
                        <th className="w-1/3 px-4 py-2 border">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {productos
                        .filter((producto) => {
                                
                                const categoria = categorias.find(cat => cat.id === producto.id_categoria);
                                const clase = claseVinos.find(clv => clv.id_clase_vino === producto.id_clase_vino);
                                return categoria?.nombre?.toLowerCase().trim() === nombre.toLowerCase().trim() ||
                                        clase?.nombre?.toLowerCase().trim() === nombre.toLowerCase().trim();
                        })
                        .map((producto) => (
                            <tr key={producto.id_producto}>
                            <td className="px-4 py-2 border">{producto.nombre}</td>
                            <td className="px-4 py-2 border">{producto.stock_minimo}</td>
                            <td className="px-4 py-2 border">{producto.stock}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
