import { useState } from 'react';
import AuthService from '../../Services/AuthService'; 
import { useNavigate } from 'react-router-dom';
import LogoSinTexto from "../../Media/LogoSinTexto.png"
import LogoTexto from "../../Media/LogoTexto.png";


export const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    
    const handleLogin = async () => {   
        const data = await AuthService.login({ email, password });
        localStorage.setItem('token', data.token);
        navigate('/Home');     
    };
    return(
        <div className="flex flex-col items-center justify-center w-screen h-screen ">
            <>
                <div className='flex gap-4 mb-9'>
                    <img src={LogoTexto} alt="" className="w-3/4 h-32"/>
                    <img src={LogoSinTexto} alt="" className='w-3/4 h-32'/>
                </div>
                <h2 className="py-8 mb-8 text-xl text-center">
                    Esta página es de uso exclusivo para trabajadores <br /> de la empresa a través del login
                </h2>
            </>
            <div className="p-8 bg-blue-400 rounded-lg shadow-lg w-80">
                <form className="space-y-7" >
                    <div>
                        <input type="email" id="email"
                        className="w-full text-black placeholder-white bg-transparent border-b border-white focus:outline-none "
                        placeholder="Mail" value={email} onChange={(e) =>setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="password" id="password"
                        className="w-full text-black placeholder-white bg-transparent border-b border-white focus:outline-none "
                        placeholder="Password" value={password} onChange={(e) =>setPassword(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <button className="px-5 py-1 mt-6 text-white transition bg-blue-400 bg-center border border-white rounded hover:bg-blue-500" onClick={handleLogin}>Acceder</button>
        </div>
    )
}