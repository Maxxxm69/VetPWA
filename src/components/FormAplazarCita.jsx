import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { DateTime } from "luxon";

export const busquedaSchema = z.object({
    numerotelefono: z.string().length(10, "El teléfono debe tener exactamente 10 dígitos")
});

export default function FormAplazarCita({ citas = [], onFinalizar, doctores=[],}) {
    const inputStyle = "w-full px-3 py-2 bg-vet-crema/45 border border-vet-azul/25 rounded-xl focus:outline-none focus:ring-2 focus:ring-vet-azul/50 transition-all";
    
    const [citasEncontradas, setCitasEncontradas] = useState([]);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [nuevaFecha, setNuevaFecha] = useState("");
    const [nuevoMedico, setNuevoMedico] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(busquedaSchema),
        defaultValues: { numerotelefono: "" }
    });

    const onBuscar = (data) => {
        const resultados = citas.filter(c => c.numerotel === data.numerotelefono);
        setCitasEncontradas(resultados);
    };

    const manejarSeleccionCita = (cita) => {
        setCitaSeleccionada(cita);
        setNuevoMedico(cita.CT || "");
        if (cita.start) {
            const fechaFormateada = cita.start instanceof Date 
                ? DateTime.fromJSDate(cita.start).toFormat("yyyy-MM-dd'T'HH:mm")
                : DateTime.fromISO(cita.start).toFormat("yyyy-MM-dd'T'HH:mm");
            setNuevaFecha(fechaFormateada);
        }
    };

    const confirmarAplazar = (e) => {
        e.preventDefault();        
        if (onFinalizar) {
            onFinalizar({
                ...citaSeleccionada,
                start: new Date(nuevaFecha),
                CT: nuevoMedico
            });
        }
    };

    if (citaSeleccionada) {
        return (
            <form onSubmit={confirmarAplazar} className="space-y-4 text-vet-azul mt-2">
                <div className="p-3 bg-vet-crema/30 border border-vet-azul/10 rounded-xl">
                    <p className="text-sm font-semibold">Aplazando cita de: {citaSeleccionada.title}</p>
                    <p className="text-xs text-gray-500">Fecha actual: {citaSeleccionada.start.toLocaleString()}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 pl-1">Nueva Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        className={inputStyle}
                        value={nuevaFecha}
                        onChange={(e) => setNuevaFecha(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 pl-1">Seleccionar Médico</label>
                    <select 
                        className={inputStyle}
                        value={nuevoMedico}
                        onChange={(e) => setNuevoMedico(e.target.value)}
                        required
                    >
                        <option value="">-- Selecciona un especialista --</option>
                        {doctores.map((doc) => (
                            <option key={doc.CT} value={doc.CT}>
                                {doc.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        type="button"
                        onClick={() => setCitaSeleccionada(null)}
                        className="w-1/2 bg-gray-200 text-gray-700 font-semibold py-2 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                        Atrás
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 bg-vet-naranja text-white font-semibold py-2 rounded-xl hover:bg-vet-naranja/90 transition-colors shadow-md"
                    >
                        Confirmar Cambio
                    </button>
                </div>
            </form>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit(onBuscar)} className="space-y-4 text-vet-azul">
                <div>
                    <label className="block text-sm font-medium mb-1 pl-1">Número de teléfono</label>
                    <input
                        type="text"
                        {...register("numerotelefono")}
                        className={inputStyle}
                        placeholder="E5512345678"
                    />
                    {errors.numerotelefono && (
                        <p className="text-red-500 text-xs mt-1 pl-1">{errors.numerotelefono.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full mt-2 bg-vet-azul text-white font-semibold py-2 rounded-xl hover:bg-vet-azul/90 transition-colors shadow-md"
                >
                    Buscar citas agendadas
                </button>
            </form>

            {citasEncontradas.length > 0 && (
                <div className="space-y-3 mt-4 max-h-60 overflow-y-auto pr-1">
                    <h3 className="text-sm font-semibold text-vet-azul">Citas encontradas:</h3>
                    {citasEncontradas.map((cita, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => manejarSeleccionCita(cita)} // 3. Usamos la nueva función aquí
                            className="w-full text-left p-3 bg-white border border-vet-azul/10 rounded-xl shadow-sm hover:border-vet-azul/45 transition-colors block"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-vet-azul">Paciente: {cita.title || "Sin nombre"}</p>
                                    <p className="text-xs text-gray-500">Tel: {cita.numerotel}</p>
                                    <p className="text-xs text-gray-500">
                                        Fecha: {cita.start instanceof Date ? DateTime.fromJSDate(cita.start).toFormat("dd/MM/yyyy HH:mm") : cita.start}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Especialista: {doctores.find(d => d.CT === cita.CT)?.title || cita.CT}
                                    </p>
                                </div>
                                <span className="text-xs text-vet-naranja font-bold">Seleccionar →</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}