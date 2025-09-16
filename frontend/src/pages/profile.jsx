// src/pages/Profile.jsx
import React from "react";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

function Profile() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CreditWise</h2>
        <nav>
          <a href="/home">
            <img src="/img/hogar.png" alt="Inicio" className="icon" /> Inicio
          </a>
          <a href="/missions">
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
          <a href="/profile" className="active">
            <img src="/img/usuario.png" alt="Perfil" className="icon" /> Perfil
          </a>
          
        </nav>
        <MenuMas />
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="header">
          <h1>Perfil</h1>
          <div className="acciones">
            <button className="btn-icon">
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        {/* Sección Perfil */}
        <section className="perfil-section">
          <div className="header-perfil">
            <img
              src="/img/icono.jpg"
              alt="Foto perfil"
              className="foto-perfil"
            />
          </div>

          <div className="datos-usuario">
            <h2>Sara Nicol Enciso</h2>
            <p className="alias">@saranicol</p>
            <p className="fecha">Se unió en junio de 2025</p>
          </div>

          <div className="resumen-estadisticas">
            <div className="item-resumen">
              <p className="dato">
                0
                <img
                  src="/img/fuego.png"
                  alt="Fuego"
                  className="icono-mini"
                />
              </p>
              <p className="etiqueta">días de racha</p>
            </div>

            <div className="item-resumen">
              <p className="dato">
                30661
                <img
                  src="/img/destello.png"
                  alt="Rayo"
                  className="icono-mini"
                />
              </p>
              <p className="etiqueta">EXP totales</p>
            </div>

            <div className="item-resumen">
              <p className="dato">
                0
                <img
                  src="/img/diamante-de-pera.png"
                  alt="Gema"
                  className="icono-mini"
                />
              </p>
              <p className="etiqueta">Nivel</p>
            </div>

            <div className="item-resumen">
              <p className="dato">
                115
                <img
                  src="/img/cortafuegos.png"
                  alt="Escudo"
                  className="icono-mini"
                />
              </p>
              <p className="etiqueta">Puntaje de crédito</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
