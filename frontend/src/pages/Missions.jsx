import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

export default function Missions() {
  const navigate = useNavigate();
  const [misiones, setMisiones] = useState([
    {
      id: 1,
      title: "🧩 Entiende qué es el crédito",
      desc: "Aprende qué es, sus tipos y cómo diferenciar una deuda buena de una mala.",
      dificultad: "Media",
      progress: 0,
      estado: "En progreso",
      clase: "pendiente",
      bloqueada: false,
    },
    {
      id: 2,
      title: "💳 Aprende cómo se calcula tu puntaje crediticio",
      desc: "Descubre los factores que afectan tu historial y cómo mejorarlo.",
      dificultad: "Alta",
      progress: 0,
      estado: "Bloqueada",
      clase: "bloqueada",
      bloqueada: true,
    },
  ]);

  const [selectedMision, setSelectedMision] = useState(null);

  // 🔵 Revisar misiones completadas al cargar
  useEffect(() => {
    const completadas = JSON.parse(localStorage.getItem("misionesCompletadas")) || [];

    setMisiones((prev) =>
      prev.map((m, index) => {
        if (completadas.includes(m.id)) {
          return { ...m, progress: 100, estado: "Completada", clase: "completada", bloqueada: false };
        }
        // Desbloquear la siguiente misión si la anterior está completada
        if (index > 0 && completadas.includes(prev[index - 1].id)) {
          return { ...m, bloqueada: false, estado: "En progreso", clase: "pendiente" };
        }
        return m;
      })
    );
  }, []);

  // 🔵 Función para marcar misión como completada desde MissionTask
  const completarMision = (id) => {
    const updated = misiones.map((m, index) => {
      if (m.id === id) {
        return { ...m, progress: 100, estado: "Completada", clase: "completada", bloqueada: false };
      }
      // Desbloquear siguiente misión
      if (index > 0 && misiones[index - 1].id === id) {
        return { ...m, bloqueada: false, estado: "En progreso", clase: "pendiente" };
      }
      return m;
    });
    setMisiones(updated);

    // Guardar progreso en localStorage
    const completadas = JSON.parse(localStorage.getItem("misionesCompletadas")) || [];
    if (!completadas.includes(id)) completadas.push(id);
    localStorage.setItem("misionesCompletadas", JSON.stringify(completadas));
  };

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

      {/* Contenido principal */}
      <main className="main-content">
        <header className="header">
          <h1>Misiones</h1>
        </header>

        <section className="misiones">
          {misiones.map((mision) => (
            <div
              key={mision.id}
              className={`card mision ${mision.clase}`}
              onClick={() => !mision.bloqueada && setSelectedMision(mision)}
            >
              <h3>{mision.title}</h3>
              <p>{mision.desc}</p>

              {/* Barra de progreso */}
              <div className="progress-section">
                <div className="progress-container">
                  <div
                    className={`progress-bar ${mision.bloqueada ? "progress-bar-blocked" : ""}`}
                    style={{ width: `${mision.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{mision.progress}%</span>
              </div>

              {/* Estado */}
              <span className={`estado ${mision.bloqueada ? "bloqueada" : "activa"}`}>
                {mision.bloqueada ? "🔒 Bloqueada" : mision.estado}
              </span>
            </div>
          ))}
        </section>
      </main>

      {/* Modal */}
      {selectedMision && (
        <div className="modal-overlay" onClick={() => setSelectedMision(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMision(null)}>
              ✖
            </button>
            <h2>{selectedMision.title}</h2>
            <p>{selectedMision.desc}</p>
            <p>
              <strong>Dificultad:</strong> {selectedMision.dificultad}
            </p>
            <button
              className="btn-ingresar"
              onClick={() =>
                navigate("/mission-task", {
                  state: { mision: selectedMision, completarMision },
                })
              }
            >
              Realizar misión
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© {new Date().getFullYear()} CreditWise. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

