import { useState } from "react";
import { Header } from "../Components/Header/Header";
import LogoSinTexto from "../Media/LogoSinTexto.png";
import LogoTexto from "../Media/LogoTexto.png";
import PowerIcon from "../Media/power.png"; 
import { UserInfo } from "../Components/UserInfo/UserInfo";
import { Notificaciones } from "../Components/Notificaciones/Notificaciones";


export const NoAdminPage = () => {
 
  const [leftTab, setLeftTab] = useState("usuario"); 
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-16 mb-6 font-ibm">
        <div className="flex items-center mb-10 space-x-10">
          <img src={LogoTexto} alt="Logo con texto" className="h-24" />
          <img src={LogoSinTexto} alt="Logo sin texto" className="h-24" />
        </div>
      </div>

      <div className="flex max-w-6xl mx-auto rounded-md shadow-sm">
        <div className="w-1/3 border-r border-black">
          <div className="p-5 mt-5 space-y-4">
            <button
              onClick={() => setLeftTab("usuario")}
              className={`w-32 rounded-md px-4 py-2 text-sm transition
                ${leftTab === "usuario" ? "bg-blue-500 text-white" : "bg-neutral-700 text-white/80"}`}
            >
              Usuario
            </button>

            <button
              onClick={() => setLeftTab("notificaciones")}
              className={`w-32 rounded-md px-4 py-2 text-sm transition
                ${leftTab === "notificaciones" ? "bg-blue-500 text-white" : "bg-neutral-700 text-white/80"}`}
            >
              Notificaciones
            </button>
          </div>

          <div className="p-5 mt-10">
            <p className="mb-3 text-black">Desconectar</p>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center w-12 h-12 border-2 rounded-full border-slate-700 hover:bg-slate-100"
              title="Cerrar sesión"
            >
              <img src={PowerIcon} alt="Desconectar" className="w-6 h-6" />
            </button>

            {role && <p className="mt-3 text-xs text-slate-500">Rol: {role}</p>}
          </div>
        </div>

        
        <div className="w-2/3 p-10">
          {leftTab === "usuario" && <UserInfo />}
          {leftTab === "notificaciones" && <Notificaciones />}
        </div>
      </div>
    </div>
  );
};
