import { Link } from "react-router-dom" 
import userIcon from '../../Media/UserIcon.png'
import LogoSinTexto from '../../Media/LogoSinTexto.png'
import { jwtDecode } from "jwt-decode"

export const Header = () =>{
    
    const getUserRole = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
        const decoded = jwtDecode(token);
        return decoded.puesto; 
        } catch (e) {
        console.error("Token inválido:", e);
        return null;
        }
    };
    
    const routesByRol = (rol) => {
        const map = {
        "administrador": "/Admin",
        "mozo-almacen": "/User",
        };
        
        return map[rol] ;
    };
    
    const path = routesByRol(getUserRole());
    
    return(
        <div className="flex gap-10 px-3 py-3 shadow-md backdrop-blur-sm font-ibm">
            <img src={LogoSinTexto} alt=""  className="ml-5 w-9 h-9"/>
            <nav className="flex px-6 text-black gap-x-6">
                <Link to="/Home" className="hover:text-blue-500">Almacen</Link>
                <Link to="/Products" className="hover:text-blue-500">Productos</Link>
            </nav>
            
            <Link to={path} className="ml-auto">
                <img src={userIcon} alt="Usuario" className="rounded-full w-9 h-9" />
            </Link>
        </div>
    )
}