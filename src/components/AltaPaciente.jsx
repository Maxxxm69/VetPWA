import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AltaPaciente(){
    const navigate = useNavigate();
    const [finalizar, setFinalizar] = useState(false);
    useEffect(() => {
        if(!finalizar) return;
        const timeOut = setTimeout(() => {
            setFinalizar(false);
            navigate("/dashboard");
        },3000);
        return() => clearTimeout(timeOut);
    }, [finalizar]);
    const [formulario, setFormulario] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();
        setFinalizar(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value 
        });
    };
    return(
        <div className="bg-vet-crema min-h-screen md:h-dvh">            
            <div className="bg-vet-azul flex flex-row relative w-full h-20 md:h-28 text-vet-crema items-end pb-4 px-4 text-2xl md:text-3xl justify-between">

                <div className="z-10">
                    <button 
                        type="button" 
                        onClick={() => navigate("/dashboard")} 
                        className="bg-vet-naranja px-3 py-1 rounded text-sm md:text-base font-semibold cursor-pointer"
                    >
                        <span className="md:hidden text-xl">←</span>
                        <span className="hidden md:inline">← Regresar</span>
                    </button>
                </div>                

                <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
                    <h2 className="tracking-wide">Nuevo Paciente</h2>
                </div>
            </div>
            <div className="px-4 mt-8 relative">
                {finalizar && (
                            <div className="fixed top-5 left-0 w-full flex justify-center items-center px-4 z-50 pointer-events-none">
                                
                                <div className="bg-emerald-600 text-white p-4 rounded-lg shadow-xl border border-emerald-500 w-full max-w-sm pointer-events-auto">
                                    <h4 className="font-bold text-lg mb-1">Se ha registrado correctamente a {formulario.nombrePaciente} </h4>
                                    <div className="mt-2 text-xs opacity-75 italic">
                                        Regresando al menu principal...
                                    </div>
                                </div>

                            </div>
                        )}
                <div className="max-w-md w-full mx-auto p-6 rounded-2xl bg-white shadow ">
                    <form className="flex flex-col space-y-4 " onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">Número de teléfono del Cuidador</label>
                            <input className="bg-vet-azul/20 border border-vet-azul/30 rounded p-2 focus:outline-vet-azul" 
                            ttype="tel" pattern="[0-9]{10}" value={formulario.telCuidador || ''} name="telCuidador" onChange={handleChange}/>
                            <label className="text-gray-700 font-medium bl-1">Nombre Paciente</label>
                            <input className="bg-vet-azul/20 border border-vet-azul/30 rounded p-2 focus:outline-vet-azul" 
                            type="text" value={formulario.nombrePaciente || ''} name="nombrePaciente" onChange={handleChange}/>
                            <label className="text-gray-700 font-medium bl-1">Alergias</label>
                            <input className="bg-vet-azul/20 border border-vet-azul/30 rounded p-2 focus:outline-vet-azul" 
                            type="text" value={formulario.alergias  || ''} name="alergias" onChange={handleChange}/>
                            <label className="text-gray-700 font-medium bl-1">Raza</label>
                            <input className="bg-vet-azul/20 border border-vet-azul/30 rounded p-2 focus:outline-vet-azul" 
                            type="text" value={formulario.raza || ''} name="raza" onChange={handleChange}/>
                            <label className="text-gray-700 font-medium bl-1">Fecha de Nacimiento</label>
                            <input className="bg-vet-azul/20 border border-vet-azul/30 rounded p-2 focus:outline-vet-azul" 
                            type="date" value={formulario.fechaPaciente || ''} name="fechaPaciente" onChange={handleChange}/>
                            <button type="submit" className="bg-vet-naranja/60 mt-5 rounded-xl py-2">
                                Dar de Alta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}