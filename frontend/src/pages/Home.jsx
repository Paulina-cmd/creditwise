// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import Notificaciones from "../components/Notificaciones";
import { useEffect, useState } from "react";
import "../assets/css/estilos.css";

const Home = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [progreso, setProgreso] = useState(0);

  useEffect(() => {
    // Traer usuario y progreso desde localStorage
    const storedUser = localStorage.getItem("usuario");
    const storedProgreso = localStorage.getItem("progreso");

    if (storedUser) setUsuario(JSON.parse(storedUser));
    if (storedProgreso) {
      const progresoArray = JSON.parse(storedProgreso);
      if (progresoArray.length > 0) {
        setProgreso(progresoArray[0].PorcentajeCompletado || 0);
      }
    }
  }, []);

  if (!usuario) return <p>Cargando...</p>; // Espera a cargar los datos

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CreditWise</h2>
        <nav>
          <Link to="/home" className="active">
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

          <MenuMas />
        </nav>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="header">
          <h1>Hola, {usuario.Nombre}</h1>
          <div className="acciones">
            <Notificaciones /> {/* Botón de notificaciones funcional */}
            <button
              className="btn-icon"
              onClick={() => navigate("/settings")}
            >
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        {/* Crédito / progreso */}
        <section className="credito">
          <div className="circle">
            <h2>{progreso}%</h2>
            <p>Progreso actual</p>
          </div>
        </section>

 {/* Cards */}
<section className="cards">
  {/* Accesos rápidos */}
  <Link to="/missions" className="card">
    <img src="/img/medalla-de-oro.png" alt="Misiones" className="card-icon" />
    <p>Misiones</p>
  </Link>

  <Link to="/recommendation" className="card">
    <img src="/img/recomendacion.png" alt="Recomendaciones" className="card-icon" />
    <p>Recomendaciones</p>
  </Link>

  {/* Información del usuario */}
  <div className="card info-usuario">
    <h4>Progreso</h4>
    <p>{progreso}% completado</p>
    <div className="progress">
      <div className="progress-bar" style={{ width: `${progreso}%` }}></div>
    </div>
    <p>EXP: {usuario.EXP || 0}</p>
    <p>Nivel: {usuario.Nivel || 0}</p>
  </div>

  <div className="card recompensas-usuario">
    <h4>Últimas recompensas</h4>
    <p>Has ganado {usuario.PuntosHoy || 0} puntos hoy</p>
    <button className="btn-outline">Canjear puntos</button>
  </div>
</section>

      </main>

      {/* Dashboard */}
      <div className="dashboard">
        <div className="card promo">
          <h3 className="super">Prueba Súper gratis</h3>
          <p>Sin anuncios, con prácticas personalizadas y sin límites para el nivel Legendario.</p>
          <button className="btn">Probar 2 semanas gratis</button>
        </div>

        <div className="card liga">
          <h4>¡Suerte para la próxima!</h4>
          <p>Quedaste en el puesto #18 y bajaste a la División Bronce</p>
          <button className="btn-outline">Ingresa a las ligas</button>
        </div>

        <div className="card desafio">
          <div className="header">
            <h4>Desafíos del día</h4>
            <a href="#">Ver todos</a>
          </div>
          <p>Gana 10 EXP</p>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>

        <div className="card recompensas">
          <h4>Recompensas</h4>
          <p>Has ganado 50 puntos hoy</p>
          <button className="btn-outline">Canjear puntos</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
