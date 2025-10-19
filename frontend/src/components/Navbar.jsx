import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src="/assets/img/logo.png" alt="CreditWise" className="logo-nav" />
      </div>
      <nav>
        <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src="/assets/img/hogar.png" alt="Inicio" className="icon" /> Home
        </NavLink>
        <NavLink to="/missions" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src="/assets/img/medalla-de-oro.png" alt="Misiones" className="icon" /> Missions
        </NavLink>
        <NavLink to="/dollar" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src="/assets/img/inversion.png" alt="Dólar" className="icon" /> Dollar
        </NavLink>
        <NavLink to="/recommendation" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src="/assets/img/recomendacion.png" alt="Recomendación" className="icon" /> Recommendation
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src="/assets/img/historial-de-transacciones.png" alt="Historial" className="icon" /> History
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src="/assets/img/usuario.png" alt="Perfil" className="icon" /> Profile
        </NavLink>
        <NavLink to="/achievements" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src="/assets/img/medalla.png" alt="Logros" className="icon" /> Achievements
        </NavLink>
      </nav>
    </nav>
  );
}

export default Navbar;

