import React from "react";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

function Missions() {
  const misiones = [
    { title: "✅ Completa tu perfil", desc: "Agrega tus datos personales para mejorar tus recomendaciones.", progress: 100, estado: "Completada", clase: "completada" },
    { title: "💸 Registra un gasto", desc: "Empieza a llevar control de tus finanzas registrando tu primer gasto.", progress: 40, estado: "Pendiente", clase: "pendiente" },
    { title: "🎯 Crea una meta de ahorro", desc: "Define una meta mensual y comienza a ahorrar desde hoy.", progress: 0, estado: "Pendiente", clase: "pendiente" },
    { title: "📊 Analiza tu consumo", desc: "Revisa tus gráficos de gastos para detectar oportunidades de ahorro.", progress: 10, estado: "Pendiente", clase: "pendiente" },
    { title: "📊 Analiza tu consumo", desc: "Revisa tus gráficos de gastos para detectar oportunidades de ahorro.", progress: 10, estado: "Pendiente", clase: "pendiente" },
    { title: "💡 Lee un consejo financiero", desc: "Explora nuestras recomendaciones para mejorar tu vida crediticia.", progress: 50, estado: "Pendiente", clase: "pendiente" }
  ];

  return (
    <div className="missions-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CreditWise</h2>
        <nav>
          <a href="/home">
            <img src="/img/hogar.png" alt="Inicio" className="icon" /> Inicio
          </a>
          <a href="/missions" className="active">
            <img src="/img/medalla-de-oro.png" alt="Misiones" className="icon" /> Misiones
          </a>
          <a href="/dollar">
            <img src="/img/inversion.png" alt="Dólar" className="icon" /> Dólar
          </a>
          <a href="/recommendation">
            <img src="/img/recomendacion.png" alt="Recomendaciones" className="icon" /> Recomendaciones
          </a>
          <a href="/history">
            <img src="/img/historial-de-transacciones.png" alt="Historial" className="icon" /> Historial
          </a>
          <a href="/profile">
            <img src="/img/usuario.png" alt="Perfil" className="icon" /> Perfil
          </a>
          <MenuMas />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Misiones</h1>
          <div className="acciones">
            <button className="btn-icon">
              <img src="/img/campana.png" alt="Notificaciones" />
            </button>
            <button className="btn-icon">
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        {/* Sección Misiones */}
        <section className="misiones">
          {misiones.map((mision, idx) => (
            <div key={idx} className={`card mision ${mision.clase}`}>
              <h3>{mision.title}</h3>
              <p>{mision.desc}</p>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${mision.progress}%` }}></div>
              </div>
              <span className="estado">{mision.estado}</span>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CreditWise. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos y Condiciones</a>
          <a href="#">Contacto</a>
        </div>
      </footer>
    </div>
  );
}

export default Missions;
