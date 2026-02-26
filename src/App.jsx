import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RutasPublicas from "./routes/Web.Routes";
import Recepcionista from "./routes/Recepcion.Routes";
import CoachRoutes from "./routes/Coach.Routes";
import MiembrosRoutes from "./routes/Miembros.Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<RutasPublicas />} />
        <Route path="/recepcion/*" element={<Recepcionista />} />
        <Route path="/coach/*" element={<CoachRoutes />} />
        <Route path="/cliente/*" element={<MiembrosRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;