// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import Misiones from "./pages/Missions";
import Dollar from "./pages/Dollar";
import Recommendation from "./pages/Recommendation";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login SIN navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/missions" element={<Misiones/>} />
        <Route path="/dollar" element={<Dollar />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/profile" element={<Profile />} />
        



        {/* Puedes agregar más así */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;


