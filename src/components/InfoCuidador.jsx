import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listaCuidadores } from "../mocks/CuidadoresMock";

export default function InfoCuidador() {
  const navigate = useNavigate();

  const [telefonoBusqueda, setTelefonoBusqueda] = useState('');
  const [cuidadorEncontrado, setCuidadorEncontrado] = useState(null);
  const [errorBusqueda, setErrorBusqueda] = useState('');

  const manejarBusqueda = (e) => {
    e.preventDefault();
    setErrorBusqueda('');
    setCuidadorEncontrado(null);

    const cuidador = listaCuidadores.find(c => c.numeroPrim === telefonoBusqueda.trim());

    if (cuidador) {
      setCuidadorEncontrado(cuidador);
    } else {
      setErrorBusqueda("Cuidador no encontrado");
    }
  };

  return (
    <div className="bg-vet-crema min-h-screen md:h-dvh">
      <div className="bg-vet-azul flex flex-col md:flex-row gap-2 w-full min-h-20 md:h-28 
      text-vet-crema items-start md:items-end pb-4 px-4 text-xl md:text-3xl justify-between pt-4 md:pt-0">

        {/* Título */}
        <div className="w-full text-center md:text-center md:absolute md:inset-x-0  md:pointer-events-none md:-translate-y-1">
          <h2 className="tracking-wide text-lg sm:text-xl md:text-3xl font-medium">
            Actualizar información del Cuidador
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

          {cuidadorEncontrado && (
            <div className="bg-white p-6 rounded-2xl shadow space-y-4 text-left">
              <h3 className="text-xl font-bold text-vet-azul border-b pb-2">Datos del Cuidador</h3>
              <p><strong>Nombre completo:</strong> {cuidadorEncontrado.nombre} {cuidadorEncontrado.apellidoP} {cuidadorEncontrado.apellidoM}</p>
              <p><strong>ID Cuidador:</strong> {cuidadorEncontrado.IDCuidador}</p>
              <p><strong>Teléfono Secundario:</strong> {cuidadorEncontrado.numeroSec || "Ninguno"}</p>
              

              <div className="flex justify-center pt-4 border-t border-gray-100">
                <Link 
                  to={`/EditarCuidador/${cuidadorEncontrado.IDCuidador}`}
                  className="w-full text-center sm:w-auto bg-vet-naranja text-white font-semibold px-6 py-2.5 rounded-xl shadow hover:bg-vet-naranja/80 transition-colors block sm:inline-block "
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