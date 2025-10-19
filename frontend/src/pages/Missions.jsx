import React, { useState } from "react";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

function Missions() {
  const [misiones, setMisiones] = useState([
    { id: 1, title: "✅ Completa tu perfil", desc: "Agrega tus datos personales para mejorar tus recomendaciones.", progress: 100, estado: "Completada", clase: "completada", dificultad: "Fácil", bloqueada: false },
    { id: 2, title: "💸 Registra un gasto", desc: "Empieza a llevar control de tus finanzas registrando tu primer gasto.", progress: 0, estado: "Pendiente", clase: "pendiente", dificultad: "Media", bloqueada: false },
    { id: 3, title: "🎯 Crea una meta de ahorro", desc: "Define una meta mensual y comienza a ahorrar desde hoy.", progress: 0, estado: "Pendiente", clase: "pendiente", dificultad: "Media", bloqueada: true },
    { id: 4, title: "📊 Analiza tu consumo", desc: "Revisa tus gráficos de gastos para detectar oportunidades de ahorro.", progress: 0, estado: "Pendiente", clase: "pendiente", dificultad: "Difícil", bloqueada: true },
    { id: 5, title: "💡 Lee un consejo financiero", desc: "Explora nuestras recomendaciones para mejorar tu vida crediticia.", progress: 0, estado: "Pendiente", clase: "pendiente", dificultad: "Fácil", bloqueada: true },
  ]);

  const [selectedMision, setSelectedMision] = useState(null);

  // Función para completar misión y desbloquear la siguiente
  const completarMision = (id) => {
    setMisiones((prev) =>
      prev.map((mision, idx) => {
        if (mision.id === id) {
          return { ...mision, estado: "Completada", progress: 100, clase: "completada" };
        }
        // Desbloquear la siguiente misión
        if (prev[idx - 1]?.id === id) {
          return { ...mision, bloqueada: false };
        }
        return mision;
      })
    );
    setSelectedMision(null); // cerrar modal
  };

  return (
    <div className="missions-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CreditWise</h2>
        <nav>
          <a href="/home"><img src="/img/hogar.png" alt="Inicio" className="icon" /> Inicio</a>
          <a href="/missions" className="active"><img src="/img/medalla-de-oro.png" alt="Misiones" className="icon" /> Misiones</a>
          <a href="/dollar"><img src="/img/inversion.png" alt="Dólar" className="icon" /> Dólar</a>
          <a href="/recommendation"><img src="/img/recomendacion.png" alt="Recomendaciones" className="icon" /> Recomendaciones</a>
          <a href="/history"><img src="/img/historial-de-transacciones.png" alt="Historial" className="icon" /> Historial</a>
          <a href="/profile"><img src="/img/usuario.png" alt="Perfil" className="icon" /> Perfil</a>
          <MenuMas />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h1>Misiones</h1>
          <div className="acciones">
            <button className="btn-icon"><img src="/img/campana.png" alt="Notificaciones" /></button>
            <button className="btn-icon"><img src="/img/configuraciones.png" alt="Configuración" /></button>
          </div>
        </header>

        {/* Sección Misiones */}
        <section className="misiones">
          {misiones.map((mision) => (
            <div
              key={mision.id}
              className={`card mision ${mision.clase} ${mision.bloqueada ? "bloqueada" : ""}`}
              onClick={() => !mision.bloqueada && setSelectedMision(mision)}
            >
              <h3>{mision.title}</h3>
              <p>{mision.desc}</p>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${mision.progress}%` }}></div>
              </div>
              <span className="estado">{mision.bloqueada ? "🔒 Bloqueada" : mision.estado}</span>
            </div>
          ))}
        </section>
      </main>

      {/* Modal */}
      {selectedMision && (
        <div className="modal-overlay" onClick={() => setSelectedMision(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMision(null)}>✖</button>
            
            <h2>{selectedMision.title}</h2>
            <p className="detalle">{selectedMision.desc}</p>

            <div className="info-extra">
              <div className="estado-box">
                <strong>Estado:</strong>{" "}
                <span className={`estado ${selectedMision.clase}`}>{selectedMision.estado}</span>
              </div>
              <div className="dificultad-box">
                <strong>Dificultad:</strong> {selectedMision.dificultad}
              </div>
            </div>

            <div className="progress">
              <div className="progress-bar" style={{ width: `${selectedMision.progress}%` }}></div>
            </div>

            <div className="modal-actions">
              {selectedMision.estado !== "Completada" && (
                <button className="btn-ingresar" onClick={() => completarMision(selectedMision.id)}>
                  Realizar
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
