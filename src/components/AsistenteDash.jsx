import { Link } from "react-router";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
        DialogDescription,
        } from "./ui/dialog";
import FormularioCita from "./FormularioCita";
import FormAplazarCita from "./FormAplazarCita";

export default function AsistenteDash() {
    const [sidebarAbierto, setSidebarAbierto] = useState(false);
    const [citasAbierto, setCitasAbierto] = useState(false);
    const [altaAbierto, setAltaAbierto] = useState(false);
    const [infoAbierto, setInfoAbierto] = useState(false);
    const [agendarCita, setAgendarCita] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogAplazar, setDialogoAplazar] = useState(false);
    const [alertaVisible, setAlertaVisible] = useState(false);
    const [infoAlerta, setInfoAlerta] = useState("");
    const localizer = luxonLocalizer(DateTime);
    const doctores = [
        { CT: "JUMA123", title: "Juan Martinez" }, 
        { CT: "ALOB876", title: "Alonso Obregon" }
    ];
    const citas = [
        {
            id: 1,
            numerotel: "5512345678",
            title: "Nutella (Chihuahua) - Vacuna",
            start: new Date(2026, 6, 16, 11, 0),
            end: new Date(2026, 6, 16, 12, 0),
            CT: "JUMA123"
        },
        {
            id: 2,
            numerotel: "5512345678",
            title: "Milaneso (Gato) - Limpieza",
            start: new Date(2026, 6, 13, 11, 30),
            end: new Date(2026, 6, 13, 12, 30),
            CT: "ALOB876"
        }
    ];
    useEffect(() => {
        if (!alertaVisible) return;
        const timeOut = setTimeout(() => {
            setAlertaVisible(false);
        }, 3000);
        return () => clearTimeout(timeOut);
    }, [alertaVisible]);

    return (
        <div className="bg-vet-crema min-h-screen flex flex-col md:flex-row text-vet-azul">
            
            <div className="bg-vet-azul text-[#d2a318] flex items-center justify-between p-4 md:hidden shadow-md z-40">
                <button 
                    onClick={() => setSidebarAbierto(!sidebarAbierto)}
                    className="text-3xl focus:outline-none cursor-pointer"
                >
                    ☰
                </button>
                <h1 className="text-xl font-bold tracking-wide">Dashboard</h1>
                <div className="w-8"></div>
            </div>

            {sidebarAbierto && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarAbierto(false)}
                />
            )}

            <aside className={`
                fixed top-0 bottom-0 left-0 bg-vet-azul text-[#d2a318] w-64 p-5 z-50 flex flex-col justify-between
                transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen shadow-xl
                ${sidebarAbierto ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div>
                    <div className="flex justify-end md:hidden mb-4">
                        <button 
                            onClick={() => setSidebarAbierto(false)}
                            className="text-2xl font-bold cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="text-center mb-8 border-b border-[#d2a318]/20 pb-4">
                        <h2 className="text-2xl font-bold tracking-wider">Veterinaria</h2>
                        <span className="text-xs text-vet-crema/60 uppercase">Panel Asistente</span>
                    </div>

                    <nav className="space-y-4 text-lg">
                        <div>
                            <button 
                                onClick={() => {setCitasAbierto(!citasAbierto);setAltaAbierto(false);setInfoAbierto(false);}} 
                                className="flex justify-between items-center w-full font-medium py-2 px-3 rounded hover:bg-vet-azul-oscuro transition-colors cursor-pointer"
                            >
                                <span>Citas</span>
                                <span>{citasAbierto ? '-':'+'}</span>
                            </button>
                            {citasAbierto && (
                                <div className="pl-6 mt-1 flex flex-col space-y-2 text-base text-vet-crema/80 border-l border-[#d2a318]/30 ml-3">
                                    <button onClick={() => {setIsDialogOpen(true); setSidebarAbierto(false);}}> Agendar Cita</button>
                                    <button onClick={() => { setSidebarAbierto(false); setDialogoAplazar(true)}}>Modificar cita</button>
                                </div>
                            )}
                        </div>

                        <div>
                            <button 
                                onClick={() => {setAltaAbierto(!altaAbierto); setCitasAbierto(false); setInfoAbierto(false)}} 
                                className="flex justify-between items-center w-full font-medium py-2 px-3 rounded hover:bg-vet-azul-oscuro transition-colors cursor-pointer"
                            >
                                <span> Dar De Alta</span>
                                <span>{altaAbierto ? '-':'+'}</span>
                            </button>
                            {altaAbierto && (
                                <div className="pl-6 mt-1 flex flex-col space-y-2 text-base text-vet-crema/80 border-l border-[#d2a318]/30 ml-3">
                                    <Link to="/AltaPaciente" className="hover:text-[#d2a318] transition-colors py-1">Alta Paciente</Link>
                                    <Link to="/AltaCuidador" className="hover:text-[#d2a318] transition-colors py-1">Alta Cuidador</Link>
                                </div>
                            )}
                        </div>

                        <div>
                            <button 
                                onClick={() => {setInfoAbierto(!infoAbierto); setAltaAbierto(false);setCitasAbierto(false);}} 
                                className="flex justify-between items-center w-full font-medium py-2 px-3 rounded hover:bg-vet-azul-oscuro transition-colors cursor-pointer"
                            >
                                <span>Actualizar Info</span>
                                <span>{infoAbierto ? '-':'+'}</span>
                            </button>
                            {infoAbierto && (
                                <div className="pl-6 mt-1 flex flex-col space-y-2 text-base text-vet-crema/80 border-l border-[#d2a318]/30 ml-3">
                                    <Link to="/InfoPaciente" className="hover:text-[#d2a318] transition-colors py-1">Paciente</Link>
                                    <Link to="/InfoCuidador" className="hover:text-[#d2a318] transition-colors py-1">Cuidador</Link>
                                </div>
                            )}
                        </div>

                        <Link 
                            to="/DarBajar" 
                            className="block font-medium py-2 px-3 rounded hover:bg-vet-azul-oscuro transition-colors"
                        >
                            Dar de Baja
                        </Link>
                    </nav>
                </div>
                
                <div className="pt-4 border-t border-[#d2a318]/20">
                    <button className="w-full bg-vet-naranja text-vet-crema text-lg rounded-xl py-2 font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-lg">
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-4 md:p-8 overflow-x-auto w-full md:h-screen md:overflow-y-auto">
                <div className="bg-white p-4 rounded-2xl shadow-sm min-w-[700px] md:min-w-full h-[650px] md:h-[calc(100vh-4rem)]">
                    <Calendar 
                        localizer={localizer}
                        events={citas}
                        resources={doctores}
                        startAccessor="start"
                        resourceIdAccessor="CT"
                        endAccessor="end"
                        view="day"
                        views={['day', 'week']}
                        resourceAccessor="CT"
                        resourceTitleAccessor="title"
                    />
                </div>
            </main>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white"> 
                    <DialogHeader>
                        <DialogTitle>Agendar Nueva Cita</DialogTitle>
                        <DialogDescription>
                            Ingresa los datos del paciente y el médico asignado para registrar la cita en el calendario.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <FormularioCita 
                        doctores={doctores} 
                        onGuardar={(datosLimpios) => {
                            setIsDialogOpen(false);
                        }} 
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={dialogAplazar} onOpenChange={setDialogoAplazar}>
                    <DialogContent className="bg=white">
                       <DialogHeader>
                             <DialogTitle>Modificar cita</DialogTitle>
                            <DialogDescription>
                                Para modificar el horario/dia de la cita debe buscar el numero de telefono
                            </DialogDescription>
                       </DialogHeader>
                       <FormAplazarCita
                            citas={citas}
                            doctores={doctores}
                            onFinalizar={(citaModificada) => {
                                setDialogoAplazar(false);
                                setInfoAlerta(citaModificada?.title || "El Paciente");
                                setAlertaVisible(true);
                            }}
                       />
                    </DialogContent>
            </Dialog>
            {alertaVisible && (
                <div className="fixed top-5 left-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50">
                    <p className="font-medium">¡Cita de {infoAlerta} modificada con éxito!</p>
                </div>
            )}
        </div>
    );
}