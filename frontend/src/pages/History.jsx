import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario) return;

        const res = await axios.get(
          `http://localhost:3001/historial/${usuario.id}`
        );
        setHistorial(res.data);
      } catch (err) {
        console.error("Error cargando historial:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

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
          <Link to="/recommendation">
            <img src="/img/recomendacion.png" alt="Recomendaciones" className="icon" /> Recomendaciones
          </Link>
          <Link to="/history" className="active">
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
          <h1>Historial de movimientos</h1>
        </header>

        <section className="historial-container">
          {loading ? (
            <p>Cargando historial...</p>
          ) : historial.length === 0 ? (
            <p>No hay movimientos aún.</p>
          ) : (
            historial.map((item) => (
              <div
                key={item.id}
                className={`historial-card ${item.tipo === "gasto" ? "historial-gasto" : ""}`}
              >
                <p className="historial-fecha">{item.fecha}</p>
                <p className="historial-descripcion">{item.descripcion}</p>
                <p className="historial-monto">
                  {item.tipo === "gasto" ? "-" : "+"}${item.monto}
                </p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Historial;
