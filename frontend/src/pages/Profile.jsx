// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

function Profile() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Simulación de datos
    const mockUser = {
      nombre: "Sara Nicol Enciso",
      alias: "saranicol",
      fecha_registro: "junio de 2025",
      foto: "/img/icono.jpg",
      dias_racha: 0,
      exp_total: 30661,
      nivel: 0,
      puntaje_credito: 115,
    };

    setUsuario(mockUser);
  }, []);

  if (!usuario) return <p className="loading">Cargando perfil...</p>;

  return (
    <div className="app-container">
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

      <main className="main-content">
        <header className="header">
          <h1>Perfil</h1>
          <div className="acciones">
            <button className="btn-icon">
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        <section className="perfil-section">
          <div className="header-perfil">
            <img
              src={usuario.foto}
              alt="Foto perfil"
              className="foto-perfil"
            />
          </div>

          <div className="datos-usuario">
            <h2>{usuario.nombre}</h2>
            <p className="alias">@{usuario.alias}</p>
            <p className="fecha">Se unió en {usuario.fecha_registro}</p>
          </div>

          <div className="resumen-estadisticas">
            <div className="item-resumen">
              <p className="dato">
                {usuario.dias_racha}
                <img src="/img/fuego.png" alt="Fuego" className="icono-mini" />
              </p>
              <p className="etiqueta">días de racha</p>
            </div>

            <div className="item-resumen">
              <p className="dato">
                {usuario.exp_total}
                <img src="/img/destello.png" alt="Rayo" className="icono-mini" />
              </p>
              <p className="etiqueta">EXP totales</p>
            </div>

            <div className="item-resumen">
              <p className="dato">
                {usuario.nivel}
                <img src="/img/diamante-de-pera.png" alt="Gema" className="icono-mini" />
              </p>
              <p className="etiqueta">Nivel</p>
            </div>

            <div className="item-resumen">
              <p className="dato">
                {usuario.puntaje_credito}
                <img src="/img/cortafuegos.png" alt="Escudo" className="icono-mini" />
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
