import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/recepcion/Dashboard";
import Miembros from "../pages/recepcion/Miembros";
import Asistencias from "../pages/recepcion/Asistencias";
import Pagos from "../pages/recepcion/Pagos";
import Reportes from "../pages/recepcion/reportes";
import Configuracion from "../pages/recepcion/Configuracion";

function recepcion() {
  return (
    <Routes>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/miembros" element={<Miembros />} />
        <Route path="/asistencias" element={<Asistencias />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/configuraciones" element={<Configuracion />} />
    </Routes>
  )
}

export default recepcion;