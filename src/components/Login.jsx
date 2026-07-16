import { useState } from "react";

export default function Login({ onLogin }) {
    const [CT, IngCT]= useState('');
    const [paswd, SetPasswd]= useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (CT=='root' && paswd=='root'){
          onLogin();
        }else{
            alert('intenta de nuevo');
        }
    };

  return (
    <div className="h-dvh bg-vet-crema ">
      <div className="flex flex-col justify-end-safe h-40 bg-[#3b478c] text-3xl text-vet-crema px-2  md:px-5 ">
        <div><h1>Gestion de</h1></div>
        <div className="translate-x-1/16"><h1>citas Veterinarias</h1></div>
        <div className="self-end text-xs mt-3 "><button className="bg-[#f58025] rounded-xl px-2 py-2 md:px-3 md:py-3  hover:bg-[#AF520C] "> Recuperar Contrasena</button></div>
      </div>

      <div className="flex flex-col items-center justify-center mt-15 p-5">
          <div className="bg-[#fdbe00] rounded-2xl mt-10 w-full max-w-md mx-auto px-6 py-10 md:px-20 md:py-10">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
                <input className="placeholder:text-xl text-center px-3 py-2  md:px-6 md:py-6 bg-vet-crema rounded-xl " 
                type="text" 
                placeholder="Ingresa tu CT" 
                value={CT}
                onChange={(e) => IngCT(e.target.value)}
                ></input>
                <input className="placeholder:text-xl text-center px-3 py-2 md:px-6 md:py-6 bg-vet-crema rounded-xl " 
                type="password" 
                placeholder="Contrasena"
                value={paswd}
                onChange={(e) => SetPasswd(e.target.value)}></input>
                <button 
                  type="submit" 
                  className=" bg-[#3b478c] text-vet-crema rounded-xl px-6 py-3 text-2xl font-semibold cursor-pointer hover:bg-[#2e376e] transition-colors"
                >
                  Iniciar Sesion
                </button>
            </form>
          </div>
      </div>
    </div>
  );
}