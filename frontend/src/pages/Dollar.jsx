import { Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css"; // Estilos aislados

const Dollar = () => {
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
          <Link to="/dollar" className="active">
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
          <h1>Dólar</h1>
          <div className="acciones">
            <button className="btn-icon">
              <img src="/img/campana.png" alt="Notificaciones" />
            </button>
            <button className="btn-icon">
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        <div className="dollar-container">
          {/* Columna izquierda */}
          <div className="dollar-left">
            <div className="dollar-card">
              <h3>💵 Cotización actual</h3>
              <p className="dollar-price">$4.230 COP</p>
              <p className="dollar-date">Actualizado: 30 de junio 2025</p>
            </div>

            <div className="dollar-graph">
              📈 Gráfico de los últimos 7 días (simulado)
            </div>
          </div>

          {/* Columna derecha */}
          <div className="dollar-right">
            <div className="dollar-card conversor">
              <h4>Convertir a COP</h4>
              <input type="number" placeholder="USD" className="dollar-input" />
              <button className="dollar-btn">Convertir</button>
              <p className="dollar-result">Resultado: $0 COP</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dollar;
