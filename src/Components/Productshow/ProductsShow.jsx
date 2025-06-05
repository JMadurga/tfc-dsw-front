import LapizIcon from "../../Media/LapizIcon.png"
import BasuraIcon  from "../../Media/BasuraIcon.png"
import {UpdateCard} from "../UpdateCard/UpdateCard";
import { useState, useEffect } from "react";
import ProductoService from "../../Services/ProductoService";
import CategoriaService from "../../Services/CategoriaService";


export const ProductsShow = () => {
    const [productoEdit, setProductoEdit] = useState(null);
    const [productos, setProductos] = useState([])
    const [categorias, setCategorias] = useState([])
    
    const abrirModal = (producto) => setProductoEdit(producto);
    const cerrarModal = () => setProductoEdit(null);
    
    const fetch = async () =>{
        const productosData = await ProductoService.getAll();
        setProductos(productosData)           
        const categoriasData = await CategoriaService.getAll();
        setCategorias(categoriasData)
    }
    
    useEffect(() => {
        fetch();
    }, []);

    const guardarCambios = async (productoEditado) => {
        try {
            await ProductoService.update(productoEditado.id_producto, productoEditado);
            cerrarModal(); 
        } catch (error) {
            console.error("Error al modificar el producto:", error);
        }
    };
    const eliminarProducto = async (id) => {
        try {
            await ProductoService.remove(id);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };
    
    return(
        <>
            <div className="flex flex-col items-center w-full font-ibm">
                {categorias.map((categoria)=>(
                    <div className="w-11/12 gap-10 px-2 py-4 mt-9" key={categoria.id}>
                        <div className="py-2 text-lg font-bold text-center bg-blue-200 rounded-t ">
                            {categoria.nombre}
                        </div>
                        <table className="w-full border-collapse table-fixed ">
                            <thead>
                                <tr className="text-left bg-gray-100">
                                    <th className="w-1/3 px-4 py-2 border">Nombre</th>
                                    <th className="w-1/3 px-4 py-2 border">Stock Mínimo</th>
                                    <th className="w-1/3 px-4 py-2 border">Stock</th>
                                    <th className="w-1/3 px-4 py-2 border">Update</th>
                                    <th className="w-1/3 px-4 py-2 border">Delete</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {productos.filter((productos) => productos.id_categoria === categoria.id).map((producto) =>(
                                    <tr key={producto.id_producto} >
                                        <td className="px-4 py-2 border">{producto.nombre}</td>
                                        <td className="px-4 py-2 border">{producto.stock_minimo}</td>
                                        <td className="px-4 py-2 border">{producto.stock}</td>
                                        <td className="px-4 py-2 border"><img src={LapizIcon} alt="" className="w-5 h-5" onClick={() => abrirModal(producto)} /></td>
                                        <td className="px-4 py-2 border"><img src={BasuraIcon} alt=""  className="w-5 h-5" onClick={() => eliminarProducto(producto.id_producto)}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))} 
            </div>
        {productoEdit && (
            <UpdateCard
            producto={productoEdit}
            onClose={cerrarModal}
            onUpdate={guardarCambios}
            />
        )}
        </>
    )
}