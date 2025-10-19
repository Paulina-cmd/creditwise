// src/pages/Settings.jsx
import { Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";
import { useState, useEffect } from "react";

const Settings = () => {
  const [usuario, setUsuario] = useState(null);
  const [notificaciones, setNotificaciones] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) setUsuario(JSON.parse(storedUser));
  }, []);

  if (!usuario) return <p>Cargando...</p>;

  const handleNotificaciones = () => setNotificaciones(!notificaciones);
  const handleTemaOscuro = () => setTemaOscuro(!temaOscuro);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CreditWise</h2>
        <nav>
          <Link to="/home">
            <img src="/img/hogar.png" alt="Inicio" className="icon" /> Inicio
          </Link>
          <Link to="/missions">
            <img src="/img/medalla-de-oro.png" alt="Misiones" className="icon" /> Misiones
          </Link>
          <Link to="/dollar">
            <img src="/img/inversion.png" alt="Dólar" className="icon" /> Dólar
          </Link>
          <Link to="/recommendation">
            <img src="/img/recomendacion.png" alt="Recomendaciones" className="icon" /> Recomendaciones
          </Link>
          <Link to="/history">
            <img src="/img/historial-de-transacciones.png" alt="Historial" className="icon" /> Historial
          </Link>
          <Link to="/profile">
            <img src="/img/usuario.png" alt="Perfil" className="icon" /> Perfil
          </Link>
          <Link to="/settings" className="active">
            <img src="/img/configuraciones.png" alt="Configuración" className="icon" /> Configuración
          </Link>

          <MenuMas />
        </nav>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="header">
          <h1>Configuraciones</h1>
        </header>

        <section className="settings-container">
          <h2>Hola, {usuario.Nombre}</h2>

          <div className="settings-item">
            <label>
              <input
                type="checkbox"
                checked={notificaciones}
                onChange={handleNotificaciones}
              />
              Recibir notificaciones
            </label>
          </div>

          <div className="settings-item">
            <label>
              <input
                type="checkbox"
                checked={temaOscuro}
                onChange={handleTemaOscuro}
              />
              Activar tema oscuro
            </label>
          </div>

          <div className="settings-item">
            <button className="btn-logout" onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}>
              Cerrar sesión
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Settings;
