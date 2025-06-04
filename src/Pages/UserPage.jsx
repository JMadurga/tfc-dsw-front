import { useState } from "react";
import Mas from '../Media/Mas.png'
import { Header } from "../Components/Header/Header";
import { TrabajadoresTable } from "../Components/TrabajadoresTable/TrabajadoresTable";
import { ProductosTable } from "../Components/ProductosTable/ProductosTable";
import { CrearTrabajadorCard } from "../Components/CrearTrabajadorCard/CrearTrabajadorCard";
import { CrearProductoCard } from "../Components/CrearProductoCard/CrearProductoCard";
import TrabajadorService from "../Services/TrabajadorService";
import ProductoService from "../Services/ProductoService";
import LogoSinTexto from "../Media/LogoSinTexto.png";
import LogoTexto from "../Media/LogoTexto.png";
import {jwtDecode} from "jwt-decode";



export const UserPage = () => {
  const [activeTab, setActiveTab] = useState("trabajadores");
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [reload, setReload] = useState(false);

  const abrirCrear = () => setMostrarCrear(true);
  const cerrarCrear = () => setMostrarCrear(false);
  const forzarRecarga = () => setReload((r) => !r);
  
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

  return (
    <div>
      <Header />

      <div className="flex flex-col items-center mt-16 mb-6 font-ibm">
      
        <div className="flex items-center mb-10 space-x-10">
          <img src={LogoTexto} alt="Logo con texto" className="h-24" />
          <img src={LogoSinTexto} alt="Logo sin texto" className="h-24" />
        </div>

        
        <div className="relative flex justify-center w-full">
          <div className="flex space-x-20">
            <button
              className={`text-xl  ${activeTab === "trabajadores" ? "text-blue-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("trabajadores")}
            >
              Trabajadores
            </button>
            <button
              className={`text-xl  ${activeTab === "productos" ? "text-blue-500" : "text-gray-700"}`}
              onClick={() => setActiveTab("productos")}
            >
              Productos
            </button>
          </div>

            <div className="absolute top-0 right-10">
              <button
                onClick={() => {
                  const puesto = getUserRole();
                  if (puesto === "administrador") {
                    abrirCrear();
                  } else {
                    alert("No tienes permiso para realizar esta acción.");
                  }
                }}
                className="flex items-center justify-center w-10 h-10 text-white bg-gray-600 rounded-full"
                title="Añadir"
              >
                <img src={Mas} alt="" className="w-5 h-5" />
              </button>
            </div>
        </div>


        <div className="w-full mt-6 border-t border-gray-300"></div>
      </div>


      {activeTab === "trabajadores" && <TrabajadoresTable reload={reload} />}
      {activeTab === "productos" && <ProductosTable reload={reload} />}

      {mostrarCrear && activeTab === "trabajadores" && (
        <CrearTrabajadorCard
          onClose={cerrarCrear}
          onCreate={async (nuevo) => {
            try {
              await TrabajadorService.create(nuevo);
              cerrarCrear();
              forzarRecarga();
            } catch (e) {
              console.error("Error al crear trabajador:", e);
            }
          }}
        />
      )}

      {mostrarCrear && activeTab === "productos" && (
        <CrearProductoCard
          onClose={cerrarCrear}
          onCreate={async (nuevo) => {
            try {
              await ProductoService.create(nuevo);
              cerrarCrear();
              forzarRecarga();
            } catch (e) {
              console.error("Error al crear producto:", e);
            }
          }}
        />
      )}
    </div>
  );
};
