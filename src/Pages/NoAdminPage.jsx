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
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-col items-center w-full mt-16 mb-6 border-b border-black font-ibm">
        <div className="flex items-center mb-10 space-x-10">
          <img src={LogoTexto} alt="Logo con texto" className="h-24" />
          <img src={LogoSinTexto} alt="Logo sin texto" className="h-24" />
        </div>
      </div>

  
      <main className="flex-1 min-h-0">

        <div className="flex w-full h-full px-6 mx-auto overflow-hidden rounded-md shadow-sm">

          <aside className="flex flex-col w-64 h-full border-r border-black shrink-0">
            <div className="flex flex-col p-5 mt-5 space-y-6">
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

            <div className="p-5 mt-auto">
              <p className="mb-3 text-black">Desconectar</p>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center w-12 h-12 border-2 rounded-full border-slate-700 hover:bg-slate-100"
                title="Cerrar sesión"
              >
                <img src={PowerIcon} alt="Desconectar" className="w-6 h-6" />
              </button>
            </div>
          </aside>

          <section className="flex-1 min-w-0 p-10 overflow-auto">
            {leftTab === "usuario" && <UserInfo />}
            {leftTab === "notificaciones" && <Notificaciones />}
          </section>
        </div>
      </main>
    </div>
  );
};
