import { Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

const Home = () => {
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
          <h1>Hola, Sara</h1>
          <div className="acciones">
            <button className="btn-icon">
              <img src="/img/campana.png" alt="Notificaciones" />
            </button>
            <button className="btn-icon">
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        <section className="credito">
          <div className="circle">
            <h2>$200.000</h2>
            <p>Tu Crédito</p>
          </div>
        </section>

<section className="cards">
  <Link to="/missions" className="card">
    <img src="/img/medalla-de-oro.png" alt="Misiones" className="card-icon" />
    <p>Misiones</p>
  </Link>

  <Link to="/dollar" className="card">
    <img src="/img/inversion.png" alt="Dólar" className="card-icon" />
    <p>Dólar</p>
  </Link>

  <Link to="/recommendation" className="card">
    <img src="/img/recomendacion.png" alt="Recomendaciones" className="card-icon" />
    <p>Recomendaciones</p>
  </Link>

  <Link to="/history" className="card">
    <img src="/img/historial-de-transacciones.png" alt="Historial" className="card-icon" />
    <p>Historial</p>
  </Link>
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
            <div className="progress-bar" style={{ width: "20%" }}></div>
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
