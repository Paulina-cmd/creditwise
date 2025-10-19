import { useState } from "react";
import { Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css"; // Asegúrate de tener estos estilos

const Recommend = () => {
  const [selected, setSelected] = useState(null);

  const recomendaciones = [
    {
      id: 1,
      titulo: "💰 Crea un fondo de emergencia",
      resumen: "Reserva al menos 3 meses de gastos básicos.",
      detalle:
        "Un fondo de emergencia debe cubrir imprevistos como pérdida de empleo, accidentes o gastos médicos. Lo recomendable es empezar con pequeñas cantidades hasta lograr cubrir mínimo 3 meses de tus gastos básicos.",
    },
    {
      id: 2,
      titulo: "📊 Revisa tus gastos semanales",
      resumen: "Haz una revisión cada 7 días.",
      detalle:
        "Revisar semanalmente te ayuda a identificar patrones de gasto, evitar fugas de dinero y tomar decisiones rápidas antes de que se descontrole tu presupuesto.",
    },
    {
      id: 3,
      titulo: "💳 Usa máximo el 30% de tu crédito",
      resumen: "Protege tu puntaje crediticio.",
      detalle:
        "Mantener tu uso de crédito por debajo del 30% demuestra a los bancos que eres responsable con tus deudas y mejora tu score financiero.",
    },
    {
      id: 4,
      titulo: "📈 Invierte poco a poco",
      resumen: "Empieza con inversiones pequeñas.",
      detalle:
        "No necesitas grandes sumas, puedes empezar con montos bajos en fondos de inversión, ETFs o incluso ahorro programado para construir un hábito.",
    },
    {
      id: 5,
      titulo: "📅 Automatiza tus ahorros",
      resumen: "Programa transferencias automáticas.",
      detalle:
        "Al automatizar, evitas la tentación de gastar antes de ahorrar. Destina un porcentaje de tus ingresos a una cuenta separada apenas los recibas.",
    },
  ];

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
        </header>

        {/* Lista de recomendaciones */}
        <section className="recommend-container">
          {recomendaciones.map((rec) => (
            <div
              key={rec.id}
              className="recommend-card"
              onClick={() => setSelected(rec)}
            >
              <h3>{rec.titulo}</h3>
              <p>{rec.resumen}</p>
            </div>
          ))}
        </section>

        {/* Modal con detalle */}
        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelected(null)}
              >
                ✖
              </button>
              <h2>{selected.titulo}</h2>
              <p>{selected.detalle}</p>
              <button className="dollar-btn" onClick={() => setSelected(null)}>
                 Entendido
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Recommend;

