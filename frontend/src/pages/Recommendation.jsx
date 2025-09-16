import { Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css"; // Estilos exclusivos

const Recommend = () => {
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
          <Link to="/recommendation" className="active">
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
          <h1>Recomendaciones</h1>
          <div className="acciones">
            <button className="btn-icon">
              <img src="/img/campana.png" alt="Notificaciones" />
            </button>
            <button className="btn-icon">
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        <section className="recommend-container">
          <div className="recommend-card">
            <h3>💰 Crea un fondo de emergencia</h3>
            <p>Reserva al menos 3 meses de gastos básicos. Te dará seguridad en momentos imprevistos.</p>
          </div>

          <div className="recommend-card">
            <h3>📊 Revisa tus gastos semanales</h3>
            <p>Haz una revisión cada 7 días para entender en qué se va tu dinero y ajustar tu presupuesto.</p>
          </div>

          <div className="recommend-card">
            <h3>💳 Usa máximo el 30% de tu crédito</h3>
            <p>Evita endeudarte más del 30% del cupo disponible para proteger tu puntaje crediticio.</p>
          </div>

          <div className="recommend-card">
            <h3>📈 Invierte poco a poco</h3>
            <p>No necesitas grandes sumas para empezar. Empieza con inversiones pequeñas y constantes.</p>
          </div>

          <div className="recommend-card">
            <h3>📅 Automatiza tus ahorros</h3>
            <p>Programa transferencias automáticas a tu cuenta de ahorros para no gastar lo que deberías guardar.</p>
          </div>

          <div className="recommend-card">
            <h3>🛒 Haz una lista antes de comprar</h3>
            <p>Evita compras impulsivas anotando lo que realmente necesitas antes de ir al supermercado.</p>
          </div>

          <div className="recommend-card">
            <h3>📚 Aprende sobre finanzas personales</h3>
            <p>Dedica al menos 15 minutos a la semana a leer o ver contenido sobre educación financiera.</p>
          </div>

          <div className="recommend-card">
            <h3>🎯 Establece metas claras</h3>
            <p>Define objetivos financieros alcanzables (como ahorrar para un viaje o un gadget) y sigue tu progreso.</p>
          </div>

          <div className="recommend-card">
            <h3>🏦 Evita tener todo en efectivo</h3>
            <p>Manejar grandes cantidades de efectivo aumenta el riesgo de gastar sin control. Usa más cuentas digitales.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Recommend;
