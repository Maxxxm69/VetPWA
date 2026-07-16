import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const citaSchema = z.object({
    numerotelefono: z.string().length(10, "El teléfono debe tener exactamente 10 dígitos"),    
    nombrePaciente: z.string().min(1, "El nombre de la mascota es obligatorio"),
    CT: z.string().min(1, "El nombre del especialista es obligatorio"),
    fechaAgenda: z.string().min(1, "La fecha es obligatoria"),
    horaAgenda: z.string().min(1, "La hora es obligatoria")
});

export default function FormularioCita({ doctores = [], onGuardar }) {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(citaSchema),
        defaultValues: {
            numerotelefono: "",
            nombrePaciente: "",
            CT: "",
            fechaAgenda: "",
            horaAgenda: ""
        }
    });

    const onSubmit = (data) => {
        console.log("Datos validados exitosamente:", data);
        if (onGuardar) {
            onGuardar(data);
        }
    };

    const inputStyle = "w-full px-3 py-2 bg-vet-crema/45 border border-vet-azul/25 rounded-xl focus:outline-none focus:ring-2 focus:ring-vet-azul/50 transition-all";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-vet-azul">
            <div>
                <label className="block text-sm font-medium mb-1 pl-1">Número de teléfono</label>
                <input 
                    type="text" 
                    {...register("numerotelefono")}
                    className={inputStyle}
                    placeholder="E.g. 5512345678"
                />
                {errors.numerotelefono && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.numerotelefono.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 pl-1">Nombre del Paciente</label>
                <input
                    type="text"
                    {...register("nombrePaciente")}
                    className={inputStyle}
                    placeholder="Nombre del Paciente"
                />
                {errors.nombrePaciente && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.nombrePaciente.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1 pl-1">Seleccionar Médico</label>
                <select 
                    {...register("CT")} 
                    className={inputStyle}
                >
                    <option value="">-- Selecciona un especialista --</option>
                    {doctores.map((doc) => (
                        <option key={doc.CT} value={doc.CT}>
                            {doc.title}
                        </option>
                    ))}
                </select>
                {errors.CT && (
                    <p className="text-red-500 text-xs mt-1 pl-1">{errors.CT.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 pl-1">Fecha</label>
                    <input 
                        type="date" 
                        {...register("fechaAgenda")} 
                        className={inputStyle}
                    />
                    {errors.fechaAgenda && (
                        <p className="text-red-500 text-xs mt-1 pl-1">{errors.fechaAgenda.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 pl-1">Hora</label>
                    <input 
                        type="time" 
                        {...register("horaAgenda")} 
                        className={inputStyle}
                    />
                    {errors.horaAgenda && (
                        <p className="text-red-500 text-xs mt-1 pl-1">{errors.horaAgenda.message}</p>
                    )}
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full mt-2 bg-vet-azul text-white font-semibold py-2 rounded-xl hover:bg-vet-azul/90 transition-colors shadow-md"
            >
                Agendar Cita
            </button>
        </form>
    );
}