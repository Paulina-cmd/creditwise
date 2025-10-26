import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/missiontask.css";

export default function MissionTask() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const mision = state?.mision;
  const completarMision = state?.completarMision; // función pasada desde Missions
  const [paso, setPaso] = useState(1);
  const totalPasos = 5;

  if (!mision) {
    return (
      <div className="fullscreen-mision">
        <p>No se encontró información de la misión.</p>
        <button onClick={() => navigate("/missions")} className="btn-ingresar">
          Volver a misiones
        </button>
      </div>
    );
  }

  // Calcular progreso
  const progreso = Math.round(((paso - 1) / (totalPasos - 1)) * 100);

  const siguientePaso = () => {
    if (paso < totalPasos) {
      setPaso(paso + 1);
    } else {
      // Marcar misión como completada en Missions
      if (completarMision) completarMision(mision.id);

      // Guardar en localStorage (por seguridad)
      const completadas = JSON.parse(localStorage.getItem("misionesCompletadas")) || [];
      if (!completadas.includes(mision.id)) {
        completadas.push(mision.id);
        localStorage.setItem("misionesCompletadas", JSON.stringify(completadas));
      }

      // Volver a Misiones
      navigate("/missions");
    }
  };

  return (
    <div className="fullscreen-mision">
      <div className="mision-contenido">
        <button className="close-fullscreen" onClick={() => navigate("/missions")}>
          ✖
        </button>

        {/* Barra de progreso */}
        <div className="progress-section">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progreso}%` }}></div>
          </div>
          <p className="progress-text">{progreso}% completado</p>
        </div>

        {/* Contenido por paso */}
        {paso === 1 && (
          <>
            <h2>¿Qué es el crédito?</h2>
            <p>
              El crédito te permite usar dinero prestado con el compromiso de devolverlo
              más adelante, generalmente con intereses. Es clave para alcanzar metas como
              comprar vivienda, estudiar o invertir.
            </p>
          </>
        )}
        {paso === 2 && (
          <>
            <h2>Tipos de crédito</h2>
            <ul>
              <li>💳 Crédito de consumo (para gastos personales o bienes).</li>
              <li>🏡 Crédito hipotecario (para vivienda).</li>
              <li>🚗 Crédito automotriz.</li>
              <li>🏢 Crédito empresarial.</li>
            </ul>
          </>
        )}
        {paso === 3 && (
          <>
            <h2>Clasificación del crédito</h2>
            <p>
              Los créditos pueden clasificarse por su plazo (corto, mediano, largo),
              su destino (consumo, inversión) o su garantía (con o sin respaldo).
            </p>
          </>
        )}
        {paso === 4 && (
          <>
            <h2>Deuda buena vs deuda mala</h2>
            <p>
              💡 <strong>Deuda buena:</strong> genera beneficios a futuro, como estudiar o invertir.<br />
              ⚠️ <strong>Deuda mala:</strong> se usa para gastos impulsivos o innecesarios.
            </p>
          </>
        )}
        {paso === 5 && (
          <>
            <h2>🎉 ¡Misión completada!</h2>
            <p>
              Has aprendido qué es el crédito, sus tipos, clasificación y cómo usarlo responsablemente.
            </p>
          </>
        )}

        <div className="modal-actions">
          <button className="btn-ingresar" onClick={siguientePaso}>
            {paso < totalPasos ? "Siguiente" : "Finalizar misión"}
          </button>
        </div>
      </div>
    </div>
  );
}
