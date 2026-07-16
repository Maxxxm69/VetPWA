import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { useState } from "react";
import Login from "./components/Login";
import AsistenteDash from "./components/AsistenteDash";
import AltaPaciente from "./components/AltaPaciente";
import AltaCuidador from "./components/AltaCuidador";
import InfoPaciente from "./components/InfoPaciente";
import InfoCuidador from "./components/InfoCuidador";
import EditarCuidador from "./components/EditarCuidador";
import EditarPaciente from "./components/EditarPaciente";

export default function App() {
  const [verificado, setVerificado] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: verificado ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => setVerificado(true)} />,
    },
    {
      path: "/dashboard",
      element: verificado ? <AsistenteDash /> : <Navigate to="/login" replace />,
    },
    {
      path: "*",
      element: <Navigate to={verificado ? "/dashboard" : "/login"} replace />,
    },
    {
      path: "/AltaPaciente",
      element: verificado ? <AltaPaciente/> : <Navigate to = "/login" replace />,
    },
    {
      path: "/AltaCuidador",
      element: verificado ? <AltaCuidador/> : <Navigate to = "/login" replace />,
    },
    {
      path: "/InfoPaciente",
      element:verificado ? <InfoPaciente/> : <Navigate to = "/login" replace/>
    },
    {
      path: "/InfoCuidador",
      element: verificado ? <InfoCuidador/> : <Navigate to ="/login" replace/> 
    },
    {
      path: "/EditarCuidador/:idCuidador",
      element: verificado ? <EditarCuidador/> : <Navigate to = "/login" replace/>
    },
    {
      path:"/EditarPaciente/:idPaciente",
      element : verificado ? <EditarPaciente/> : <Navigate to = "/login" replace/>
    }
  ]);

  return <RouterProvider router={router} />;
}