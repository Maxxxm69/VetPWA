import { useParams, useNavigate } from "react-router-dom";
import { listaCuidadores } from "../mocks/CuidadoresMock";
import { useState, useEffect } from "react";

export default function EditarCuidador(){
    const navigate = useNavigate();
    const { idCuidador } = useParams();
    const [finalizar, setFinalizar] = useState(false);
    const [cambios, setCambios] = useState([]);
    const cuidador = listaCuidadores.find(c => String(c.IDCuidador) === String(idCuidador)); 

    const valoresOrgi = {
        nombre: cuidador?.nombre || "",
        apellidoPa: cuidador?.apellidoP || "",
        apellidoMa: cuidador?.apellidoM || "",
        telefonoPrin: cuidador?.numeroPrim || "",
        telefonoSec: cuidador?.numeroSec || ""
    }
    const [formulario, setFormulario] = useState(valoresOrgi);

    useEffect(() => {
        if(!finalizar) return;
        const timeOut = setTimeout(() => {
            setFinalizar(false);
            navigate("/dashboard");
        },3000);
        return () => clearTimeout(timeOut);
    },[finalizar]);
    const etiquetas = {
        nombre: "Nombre",
        apellidoPa: "Apellido Paterno",
        apellidoMa: "Apellido Materno",
        telefonoPrin: "Teléfono Principal",
        telefonoSec: "Teléfono Secundario"
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let tempCambios = [];
        Object.keys(formulario).forEach((llave) =>{
            if(formulario[llave].trim() != valoresOrgi[llave].trim()){
                tempCambios.push(etiquetas[llave], formulario[llave]);
            }
        })
        setCambios(tempCambios);
        setFinalizar(true); 
    };
    const llaves = Object.keys(formulario);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value 
        });
    };

    return(
        <div className="bg-vet-crema min-h-screen pb-10">
            <div className="bg-vet-azul w-full p-4 md:px-8 md:py-6 text-vet-crema 
                            flex flex-col gap-3 md:flex-row md:items-center md:justify-between shadow-lg">
                <div className="md:absolute md:left-1/2 md:-translate-x-1/2 text-left md:text-center">
                    <h2 className="text-xl md:text-2xl font-bold tracking-wide balance">
                        Actualizar información del Cuidador
                    </h2>
                </div>
                <div className="flex items-center">
                    <button 
                        type="button" 
                        onClick={() => navigate(-1)} 
                        className="bg-vet-naranja hover:bg-vet-naranja/90 px-4 py-2 rounded-lg 
                                   text-sm font-semibold cursor-pointer transition-colors shadow-sm
                                   flex items-center gap-1"
                    >
                        <span>←</span>
                        <span className="hidden md:inline">Regresar</span>
                    </button>
                </div>
                <div className="hidden md:block w-24"></div>
            </div>

            <div className="px-4 relative">
                        {finalizar && (
                            <div className="fixed top-5 left-0 w-full flex justify-center items-center px-4 z-50 pointer-events-none">
                                
                                <div className="bg-emerald-600 text-white p-4 rounded-lg shadow-xl border border-emerald-500 w-full max-w-sm pointer-events-auto">
                                    <h4 className="font-bold text-lg mb-1">Información Actualizada</h4>
                                    {cambios.length > 0 ? (
                                        <>
                                            <p className="text-sm opacity-90">Se realizaron los siguientes cambios:</p>
                                            <ul className="list-disc list-inside mt-2 text-xs bg-emerald-700/30 p-2 rounded">                                                
                                                {cambios.map((item, index) => (
                                                    <li key={index} className="font-semibold">
                                                        {item}
                                                    </li>
                                                ))}
                                                
                                            </ul>
                                        </>
                                    ) : (
                                        <p className="text-sm opacity-90">No hubo cambios</p>
                                    )}
                                    <div className="mt-2 text-xs opacity-75 italic">
                                        Regresando al menu principal...
                                    </div>
                                </div>

                            </div>
                        )}
                <form 
                    onSubmit={handleSubmit}
                    className="p-6 md:p-8 flex flex-col gap-5 max-w-md mx-auto 
                               bg-white shadow-xl rounded-2xl mt-8 border border-gray-100"
                >
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Nombre</label>
                        <input type="text"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                            className="block w-full p-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Apellido Paterno</label>
                        <input type="text"
                            name="apellidoPa"
                            value={formulario.apellidoPa}
                            onChange={handleChange}
                            className="block w-full p-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Apellido Materno</label>
                        <input type="text"
                            name="apellidoMa"
                            value={formulario.apellidoMa}
                            onChange={handleChange}
                            className="block w-full p-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Número de teléfono principal</label>
                        <input type="text"
                            name="telefonoPrin" 
                            value={formulario.telefonoPrin}
                            onChange={handleChange}
                            className="block w-full p-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Número secundario</label>
                        <input type="text"
                            name="telefonoSec"
                            value={formulario.telefonoSec}
                            onChange={handleChange}
                            className="block w-full p-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div className="mt-4">
                        <button 
                            type="submit" 
                            className="w-full bg-vet-naranja hover:bg-vet-naranja/90 text-white font-medium 
                                       rounded-xl py-3 px-4 shadow-md transition-all transform active:scale-[0.98] 
                                       cursor-pointer text-center"
                        >
                            Finalizar y Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}