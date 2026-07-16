import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listaCuidadores } from "../mocks/CuidadoresMock";

export default function InfoCuidador() {
  const navigate = useNavigate();

  const [telefonoBusqueda, setTelefonoBusqueda] = useState('');
  const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
  const [errorBusqueda, setErrorBusqueda] = useState('');

  const manejarBusqueda = (e) => {
    e.preventDefault();
    setErrorBusqueda('');
    setPacienteEncontrado(null);

    const cuidador = listaCuidadores.find(c => c.numeroPrim === telefonoBusqueda.trim());

    if (cuidador) {
      setPacienteEncontrado(cuidador);
    } else {
      setErrorBusqueda("Cuidador no encontrado");
    }
  };

  return (
    <div className="bg-vet-crema min-h-screen md:h-dvh">
      <div className="bg-vet-azul flex flex-col md:flex-row gap-2 w-full min-h-20 md:h-28 
      text-vet-crema items-start md:items-end pb-4 px-4 text-xl md:text-3xl justify-between pt-4 md:pt-0">

        <div className="w-full text-center md:text-center md:absolute md:inset-x-0  md:pointer-events-none md:-translate-y-1">
          <h2 className="tracking-wide text-lg sm:text-xl md:text-3xl font-medium">
            Actualizar información del paciente
          </h2>
        </div>
        <div className="flex-shrink-0">
          <button 
            type="button" 
            onClick={() => navigate("/dashboard")} 
            className="bg-vet-naranja px-3 py-1 rounded text-sm md:text-base
            font-semibold cursor-pointer"
          >
            <span className="md:hidden text-xl">←</span>
            <span className="hidden md:inline">← Regresar</span>
          </button>
        </div> 
      </div>

      <div className="px-4 mt-20 space-y-6">
        <div className="max-w-md w-full mx-auto p-6 rounded-2xl bg-white shadow text-center">
          <form onSubmit={manejarBusqueda} className="flex flex-col space-y-4">
            <label className="text-gray-700 font-medium bl-1">
              Número de teléfono Principal del Cuidador
            </label>
            <input 
              className="bg-vet-azul/20 border border-vet-azul/30 rounded p-2 focus:outline-vet-azul" 
              type="tel" pattern="[0-9]{10}"
              placeholder="Ej. 5512345678"
              value={telefonoBusqueda} 
              onChange={(e) => setTelefonoBusqueda(e.target.value)}
            />
            <button type="submit" className="bg-vet-naranja text-white font-semibold
            mt-5 rounded-xl py-2 shadow hover:bg-vet-naranja/80 transition-colors">
              Buscar
            </button>
          </form>
        </div>

        <div className="max-w-md w-full mx-auto flex justify-center">
          {errorBusqueda && (
            <p className="text-red-500 font-semibold text-center bg-red-100 p-3 rounded-xl">{errorBusqueda}</p>
          )}

          {pacienteEncontrado && (
  <div className="bg-white p-6 rounded-2xl shadow space-y-4 text-left w-full">
    <h3 className="text-xl font-bold text-vet-azul border-b pb-2">
      Pacientes de: <span className="text-gray-700 font-medium">{pacienteEncontrado.nombre} {pacienteEncontrado.apellidoP}</span>
    </h3>
    
      <div className="space-y-3">
        {pacienteEncontrado.pacientes.map((paciente) => (
          <Link 
            key={paciente.idPaciente} 
            to={`/EditarPaciente/${paciente.idPaciente}`}
            className="block hover:opacity-90 transition-opacity"
          >
            <div className="p-3 bg-vet-crema/40 border border-vet-azul/10 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-semibold text-vet-azul text-lg">{paciente.nombrePaciente}</p>
                <p className="text-xs text-gray-500">
                  Raza: {paciente.raza} | Alergias: {paciente.alergias || paciente.allergies}
                </p>
              </div>
              <span className="bg-vet-azul/10 text-vet-azul text-xs px-2.5 py-1 rounded-full font-medium">
                ID: #{paciente.idPaciente}
              </span>
            </div>
          </Link>
        ))}
      </div>

          <div className="flex justify-center pt-4 border-t border-gray-100">
            <Link 
              to={`/EditarCuidador/${pacienteEncontrado.IDCuidador}`}
              className="w-full text-center bg-vet-naranja text-white font-semibold px-6 py-2.5 rounded-xl shadow hover:bg-vet-naranja/80 transition-colors block"
            >
              Actualizar Información
            </Link>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}