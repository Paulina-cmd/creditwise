import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

export default function MissionTask() {
  const navigate = useNavigate();
  const [mision, setMision] = useState(null);
  const [paso, setPaso] = useState(1);
  const totalPasos = 5;

  // Cargar misión desde localStorage al iniciar
  useEffect(() => {
    const misionGuardada = localStorage.getItem("misionActual");
    if (misionGuardada) {
      setMision(JSON.parse(misionGuardada));
      localStorage.removeItem("misionActual");
    }
  }, []);

  // FUNCIÓN CORREGIDA PARA GUARDAR EN BACKEND
  const guardarEnBackend = async (misionId) => {
    try {
      const usuarioId = sessionStorage.getItem('usuarioId');
      
      if (!usuarioId) {
        console.error("❌ No hay usuarioId en sessionStorage");
        return false;
      }

      console.log(`🚀 Guardando misión ${misionId} en backend para usuario ${usuarioId}...`);

      // SOLO usar el endpoint que vamos a crear
      const response = await fetch(
        `http://localhost:8000/historial/completar-mision/${usuarioId}/${misionId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) throw new Error("Error al guardar");
      const data = await response.json();
      console.log("✅ Misión guardada en backend:", data);
      return true;
      
    } catch (error) {
      console.error("❌ Error guardando en backend:", error);
      return false;
    }
  };

  if (!mision) {
    return (
      <div className="app-container page-transition">
        <aside className="sidebar sidebar-appear">
          <h2 className="logo">CreditWise</h2>
          <nav>
            <Link to="/home">
              <img src="/img/hogar.png" alt="Inicio" className="icon" /> Inicio
            </Link>
            <Link to="/missions">
              <img src="/img/medalla-de-oro.png" alt="Misiones" className="icon" /> Misiones
            </Link>
          </nav>
          <MenuMas />
        </aside>
        <main className="main-content content-appear">
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p>No se encontró información de la misión.</p>
            <button onClick={() => navigate("/missions")} className="btn btn-hover">
              ← Volver a misiones
            </button>
          </div>
        </main>
      </div>
    );
  }

  const progreso = Math.round(((paso - 1) / (totalPasos - 1)) * 100);

  const siguientePaso = async () => {
    if (paso < totalPasos) {
      setPaso(paso + 1);
    } else {
      // ✅ MARCAR MISIÓN COMO COMPLETADA
      const usuarioId = sessionStorage.getItem('usuarioId');
      const claveMisiones = `misionesCompletadas_${usuarioId}`;
      const completadas = JSON.parse(localStorage.getItem(claveMisiones)) || [];
      
      if (!completadas.includes(mision.id)) {
        completadas.push(mision.id);
        localStorage.setItem(claveMisiones, JSON.stringify(completadas));
        console.log(`✅ Misión ${mision.id} marcada como completada para usuario ${usuarioId}`);
        
        // 1. SUMAR PUNTOS Y EXP AL PERFIL (localStorage)
        sumarPuntosYMisiones(mision.id);
        
        // 2. GUARDAR EN EL BACKEND (MySQL)
        const exito = await guardarEnBackend(mision.id);
        
        if (exito) {
          console.log("🎉 Misión guardada en backend exitosamente");
        } else {
          console.log("⚠️ Misión guardada solo en frontend");
        }
      }

      // Notificar al historial y otros listeners que hay cambios
      window.dispatchEvent(new Event('localStorageChange'));
      
      // PEQUEÑA PAUSA antes de navegar para asegurar que React pueda actualizar
      setTimeout(() => {
        navigate("/missions");
      }, 500);
    }
  };

  const sumarPuntosYMisiones = (misionId) => {
    const perfilActual = JSON.parse(localStorage.getItem("perfilUsuario")) || {
      puntos: 0,
      exp: 0,
      misionesCompletadas: 0,
      nivel: 1,
      dias_racha: 0
    };

    const recompensas = {
      1: { puntos: 50, exp: 100 },
      2: { puntos: 75, exp: 150 }
    };

    const recompensa = recompensas[misionId] || { puntos: 50, exp: 100 };

    const nuevoPerfil = {
      ...perfilActual,
      puntos: perfilActual.puntos + recompensa.puntos,
      exp: perfilActual.exp + recompensa.exp,
      misionesCompletadas: perfilActual.misionesCompletadas + 1,
      nivel: Math.floor((perfilActual.exp + recompensa.exp) / 300) + 1
    };

    localStorage.setItem("perfilUsuario", JSON.stringify(nuevoPerfil));
    window.dispatchEvent(new Event('perfilActualizado'));
  };

  return (
    <div className="app-container page-transition">
      {/* Sidebar */}
      <aside className="sidebar sidebar-appear">
        <h2 className="logo">CreditWise</h2>
        <nav>
          <Link to="/home">
            <img src="/img/hogar.png" alt="Inicio" className="icon" /> Inicio
          </Link>
          <Link to="/missions" className="active">
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

      {/* Main Content */}
      <main className="main-content content-appear">
        <header className="header">
          <h1>{mision.title || "Misión"}</h1>
          <button className="btn btn-hover" onClick={() => navigate("/missions")}>
            ← Volver a Misiones
          </button>
        </header>

        <div className="mission-task-container card-appear">
          <div className="progress-section">
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progreso}%` }}></div>
            </div>
            <p className="progress-text">{progreso}% completado - Paso {paso} de {totalPasos}</p>
          </div>

          <div className="mission-content" style={{ marginTop: "30px" }}>
            {/* Contenido por misión */}
            {mision.id === 1 && (
              <>
                {paso === 1 && (<><h2>¿Qué es el crédito?</h2><p>El crédito es una herramienta financiera que te permite acceder a dinero prestado por una entidad (banco, tienda, persona) con el compromiso de devolverlo en el futuro, generalmente con intereses. El crédito puede ayudarte a alcanzar metas importantes como comprar una casa, estudiar, invertir en un negocio o enfrentar emergencias. <br /><br /><strong>¿Por qué es importante?</strong> Porque te da flexibilidad financiera, pero también implica responsabilidad: debes devolver el dinero y pagar intereses. Un buen manejo del crédito te ayuda a construir un historial financiero positivo y acceder a mejores oportunidades en el futuro.</p><ul><li><strong>Ejemplo:</strong> Si compras una computadora a crédito, la usas de inmediato y la pagas en cuotas mensuales.</li><li><strong>Consejo:</strong> Antes de pedir crédito, asegúrate de poder pagar las cuotas y de entender el costo total.</li></ul></>)}
                {paso === 2 && (<><h2>Tipos de crédito</h2><p>Existen varios tipos de crédito, cada uno con características y usos diferentes:</p><ul style={{ marginLeft: "20px", marginTop: "15px" }}><li>💳 <strong>Crédito de consumo:</strong> Para comprar bienes personales (electrodomésticos, ropa, viajes). Suele tener tasas de interés más altas y plazos cortos.</li><li>🏡 <strong>Crédito hipotecario:</strong> Para comprar vivienda. Plazos largos (hasta 30 años) y tasas más bajas. La casa queda como garantía.</li><li>🚗 <strong>Crédito automotriz:</strong> Para comprar vehículos. Plazos intermedios y el auto es la garantía.</li><li>🏢 <strong>Crédito empresarial:</strong> Para financiar negocios, proyectos o capital de trabajo. Puede ser a corto o largo plazo.</li></ul><p><strong>Ejemplo:</strong> Un crédito hipotecario te permite comprar una casa y pagarla en cuotas mensuales durante varios años.</p></>)}
                {paso === 3 && (<><h2>Clasificación del crédito</h2><p>Los créditos se pueden clasificar según:</p><ul><li><strong>Plazo:</strong> <ul><li>Corto plazo: Menos de 1 año (tarjetas de crédito, préstamos personales).</li><li>Mediano plazo: 1 a 5 años (auto, consumo).</li><li>Largo plazo: Más de 5 años (hipotecas).</li></ul></li><li><strong>Destino:</strong> <ul><li>Consumo: Para gastos personales.</li><li>Inversión: Para negocios, estudios, vivienda.</li></ul></li><li><strong>Garantía:</strong> <ul><li>Con garantía: El bien comprado respalda el crédito (casa, auto).</li><li>Sin garantía: Solo tu historial y capacidad de pago respaldan el préstamo.</li></ul></li></ul><p><strong>Consejo:</strong> Elige el tipo de crédito que mejor se adapte a tu necesidad y capacidad de pago.</p></>)}
                {paso === 4 && (<><h2>Deuda buena vs deuda mala</h2><p style={{ marginTop: "15px" }}><strong>Deuda buena:</strong> Es aquella que te ayuda a mejorar tu vida o tus finanzas a largo plazo. Ejemplos: estudiar una carrera, comprar una casa, invertir en un negocio.<br /><strong>Deuda mala:</strong> Es la que se usa para gastos impulsivos, compras innecesarias o cosas que pierden valor rápido (ropa de moda, gadgets, fiestas).<br /><br />💡 <strong>Tip:</strong> Antes de endeudarte, pregúntate: ¿esto me ayudará a crecer o solo es un gusto momentáneo?</p><ul><li><strong>Ejemplo de deuda buena:</strong> Un préstamo para estudiar una carrera que te permitirá ganar más dinero en el futuro.</li><li><strong>Ejemplo de deuda mala:</strong> Comprar un celular de última gama a crédito solo por moda.</li></ul></>)}
                {paso === 5 && (<><h2>🎉 ¡Misión completada!</h2><p style={{ marginTop: "15px" }}>¡Felicidades! Has aprendido qué es el crédito, sus tipos, clasificación y cómo usarlo responsablemente. Recuerda: el crédito es una herramienta poderosa si lo usas con inteligencia y responsabilidad.</p><div className="recompensa-info" style={{ marginTop: "30px" }}><h3>🎯 Recompensas obtenidas:</h3><p>+50 puntos</p><p>+100 EXP</p><p>¡Sigue así! Tu educación financiera está creciendo.</p></div></>)}
              </>
            )}
            {mision.id === 2 && (
              <>
                {paso === 1 && (<><h2>¿Qué es el interés?</h2><p>El interés es el precio que pagas por usar dinero prestado. Es el beneficio que recibe quien presta el dinero. <br /><br /><strong>¿Por qué es importante?</strong> Porque determina cuánto terminarás pagando por un crédito. Entender el interés te ayuda a tomar mejores decisiones financieras.</p><ul><li><strong>Ejemplo:</strong> Si pides $1,000 y el interés es 10% anual, al final del año deberás devolver $1,100.</li><li><strong>Consejo:</strong> Siempre pregunta cuál es la tasa de interés antes de aceptar un crédito.</li></ul></>)}
                {paso === 2 && (<><h2>Interés simple</h2><p>El interés simple se calcula solo sobre el capital inicial. <br /><br /><strong>Fórmula:</strong> Interés = Capital × Tasa × Tiempo<br /><br /><strong>Ejemplo:</strong> Si pides $2,000 al 5% anual por 2 años:<br />Interés = $2,000 × 0.05 × 2 = $200<br />Total a pagar = $2,200</p><ul><li><strong>Tip:</strong> El interés simple es fácil de calcular y se usa en préstamos cortos.</li></ul></>)}
                {paso === 3 && (<><h2>Interés compuesto</h2><p>El interés compuesto se calcula sobre el capital inicial <strong>y</strong> los intereses acumulados. Es decir, "interés sobre interés".<br /><br /><strong>Fórmula:</strong> Monto final = Capital × (1 + Tasa)<sup>Tiempo</sup><br /><br /><strong>Ejemplo:</strong> Si inviertes $1,000 al 10% anual por 3 años:<br />Año 1: $1,000 × 10% = $1,100<br />Año 2: $1,100 × 10% = $1,210<br />Año 3: $1,210 × 10% = $1,331<br />Total: $1,331</p><ul><li><strong>Tip:</strong> El interés compuesto hace crecer tu dinero más rápido, pero también puede aumentar tus deudas si no pagas a tiempo.</li></ul></>)}
                {paso === 4 && (<><h2>Comparando opciones de crédito</h2><p>Antes de elegir un crédito, compara:</p><ul><li><strong>Tasa de interés:</strong> ¿Es fija o variable?</li><li><strong>Plazo:</strong> ¿Cuánto tiempo tienes para pagar?</li><li><strong>Comisiones:</strong> ¿Hay costos extra?</li><li><strong>CAT (Costo Anual Total):</strong> Incluye todos los gastos y te ayuda a comparar créditos.</li></ul><p><strong>Ejemplo:</strong> Un crédito con tasa baja pero muchas comisiones puede ser más caro que uno con tasa alta y sin comisiones.</p></>)}
                {paso === 5 && (<><h2>🎉 ¡Misión completada!</h2><p>¡Excelente! Ahora sabes cómo calcular intereses, comparar créditos y tomar decisiones informadas. Recuerda: el interés puede ser tu aliado si lo entiendes y lo usas a tu favor.</p><div className="recompensa-info" style={{ marginTop: "30px" }}><h3>🎯 Recompensas obtenidas:</h3><p>+75 puntos</p><p>+150 EXP</p><p>¡Sigue aprendiendo y creciendo!</p></div></>)}
              </>
            )}
            {mision.id === 3 && (
              <>
                {paso === 1 && (<><h2>¿Por qué ahorrar?</h2><p>Ahorrar es separar una parte de tus ingresos para usarla en el futuro. El ahorro te da seguridad, te ayuda a enfrentar imprevistos y te permite alcanzar metas importantes como estudios, viajes, vivienda o iniciar un negocio.<br /><br /><strong>¿Por qué es fundamental?</strong> Porque te protege de deudas innecesarias y te da libertad financiera.<br /><br /><strong>Ejemplo:</strong> Si ahorras $100 cada mes, en un año tendrás $1,200 para emergencias o proyectos.</p></>)}
                {paso === 2 && (<><h2>Fondo de emergencia</h2><p>Un fondo de emergencia es dinero reservado para cubrir gastos inesperados, como enfermedades, accidentes, reparaciones o pérdida de empleo.<br /><br /><strong>¿Cuánto ahorrar?</strong> Lo ideal es tener entre 3 y 6 meses de tus gastos mensuales.<br /><br /><strong>Ejemplo:</strong> Si gastas $500 al mes, tu fondo debería ser de $1,500 a $3,000.<br /><br /><strong>Consejo:</strong> No uses este fondo para compras impulsivas, solo para emergencias reales.</p></>)}
                {paso === 3 && (<><h2>Hábitos de ahorro</h2><p>Los mejores hábitos de ahorro son:</p><ul><li>Ahorrar una cantidad fija cada mes, como si fuera un gasto obligatorio.</li><li>Automatizar el ahorro: programa transferencias automáticas a tu cuenta de ahorros.</li><li>Evitar gastar en cosas innecesarias.</li><li>Revisar tus gastos y buscar oportunidades para ahorrar más.</li></ul><p><strong>Ejemplo:</strong> Si recibes tu salario, aparta el ahorro antes de gastar en otras cosas.</p></>)}
                {paso === 4 && (<><h2>Regla 50/30/20</h2><p>La regla 50/30/20 te ayuda a organizar tu presupuesto:</p><ul><li><strong>50% para necesidades:</strong> Comida, vivienda, transporte, salud.</li><li><strong>30% para deseos:</strong> Salidas, entretenimiento, compras personales.</li><li><strong>20% para ahorro e inversión:</strong> Fondo de emergencia, metas, inversiones.</li></ul><p><strong>Consejo:</strong> Si puedes ahorrar más del 20%, ¡mucho mejor!</p></>)}
                {paso === 5 && (<><h2>🎉 ¡Misión completada!</h2><p>¡Felicidades! Ahora tienes herramientas para ahorrar mejor, cuidar tus finanzas y alcanzar tus sueños. Recuerda: el ahorro es la base de una vida financiera saludable.</p><div className="recompensa-info" style={{ marginTop: "30px" }}><h3>🎯 Recompensas obtenidas:</h3><p>+100 puntos</p><p>+200 EXP</p><p>¡Sigue creciendo y aprendiendo!</p></div></>)}
              </>
            )}
            {/* Puedes agregar más misiones aquí usando mision.id === 4, etc. */}
            {/* Si no hay contenido específico, muestra un mensaje genérico */}
            {[1,2,3].indexOf(mision.id) === -1 && (
              <>
                <h2>Contenido personalizado</h2>
                <p>Esta misión aún no tiene contenido específico. ¡Pronto estará disponible!</p>
              </>
            )}
          </div>

          <div className="modal-actions" style={{ marginTop: "30px", display: "flex", gap: "10px", justifyContent: "center" }}>
            {paso < totalPasos ? (
              <button className="btn-ingresar btn-hover" onClick={siguientePaso}>
                Siguiente paso →
              </button>
            ) : (
              <>
                <button 
                  className="btn-ingresar btn-hover" 
                  onClick={() => navigate(`/evaluation-quiz?misionId=${mision.id}`)}
                  style={{ background: "#4CAF50" }}
                >
                  📝 Ir a Evaluación
                </button>
                <button 
                  className="btn-ingresar btn-hover" 
                  onClick={siguientePaso}
                  style={{ background: "#2196F3" }}
                >
                  Volver a Misiones
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}