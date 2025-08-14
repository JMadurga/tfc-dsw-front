import LapizIcon from "../../Media/LapizIcon.png"
import BasuraIcon  from "../../Media/BasuraIcon.png"
import {UpdateCard} from "../UpdateCard/UpdateCard";
import { useState, useEffect } from "react";
import ProductoService from "../../Services/ProductoService";
import CategoriaService from "../../Services/CategoriaService";


export const ProductsShow = () => {

    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    

    
    const fetch = async () =>{
        const productosData = await ProductoService.getAll();
        setProductos(productosData)           
        const categoriasData = await CategoriaService.getAll();
        setCategorias(categoriasData)
    }
    
    useEffect(() => {
        fetch();
    }, []);


    
    return(
        <>
            <div className="flex flex-col items-center w-full font-ibm">
                <div className="w-11/12 mt-6">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                {categorias.map((categoria) => {
                    const productosCategoria = productos.filter(
                        (producto) => producto.id_categoria === categoria.id
                    );

                    const productosFiltrados = searchTerm
                        ? productosCategoria.filter((producto) =>
                            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        : productosCategoria;

                    if (searchTerm && productosFiltrados.length === 0) {
                        return null;
                    }

                    return (
                        <div className="w-11/12 gap-10 px-2 py-4 mt-9" key={categoria.id}>
                            <div className="py-2 text-lg font-bold text-center bg-blue-200 rounded-t">
                                {categoria.nombre}
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
                                {productosFiltrados.map((producto) => (
                                    <tr key={producto.id_producto}>
                                    <td className="px-4 py-2 border">{producto.nombre}</td>
                                    <td className="px-4 py-2 border">{producto.stock_minimo}</td>
                                    <td className="px-4 py-2 border">{producto.stock}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
                
            </div>
        </>
    )
}