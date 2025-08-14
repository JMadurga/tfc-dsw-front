import LogoSinTexto from '../Media/LogoSinTexto.png'
import LogoTexto from '../Media/LogoTexto.png'
import { useState } from "react";
import { Login } from "../Components/Login/Login";

export const LoginPage = () => {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const clickHandler = () => {
    setMostrarLogin(true);
  };

  return (
    <div className={`flex font-ibm flex-col items-center justify-center w-screen h-screen transition-colors duration-500 ${mostrarLogin ? 'bg-blue-200' : 'bg-white'}`}>
      {!mostrarLogin && (
        <>
          <div className='flex gap-4 mb-9'>
            <img src={LogoTexto} alt="" className="w-3/4 h-32"/>
            <img src={LogoSinTexto} alt="" className='w-3/4 h-32'/>
          </div> 
          <h2 className="py-8 mb-8 text-xl text-center">
            Esta página es de uso exclusivo para trabajadores <br /> de la empresa a través del login
          </h2>
        </>
      )}
      {!mostrarLogin && (
        <button onClick={clickHandler} className="px-6 py-2 text-white transition bg-blue-400 border border-black rounded hover:bg-blue-500">
          Acceder
        </button>
      )}
      {mostrarLogin && ( <Login />)}
    </div>
  );
};
