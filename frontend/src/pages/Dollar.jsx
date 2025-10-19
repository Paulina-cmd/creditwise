import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../assets/css/estilos.css";

const Dollar = () => {
  const [rate, setRate] = useState(null);
  const [history, setHistory] = useState([]);
  const [usdAmount, setUsdAmount] = useState("");
  const [copAmount, setCopAmount] = useState("");
  const [copResult, setCopResult] = useState(null);
  const [usdResult, setUsdResult] = useState(null);

  // 📌 Cargar valor actual
  useEffect(() => {
    const fetchCurrentRate = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        setRate(data.rates.COP);
      } catch (err) {
        console.error("Error obteniendo cotización actual:", err);
      }
    };

    fetchCurrentRate();
  }, []);

  // 📌 Cargar histórico de los últimos 7 días
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        const startDateStr = startDate.toISOString().split("T")[0];

        const res = await fetch(
          `https://api.exchangerate.host/timeseries?start_date=${startDateStr}&end_date=${endDate}&base=USD&symbols=COP`
        );
        const data = await res.json();

        if (data.success && data.rates) {
          const formatted = Object.entries(data.rates).map(([date, val]) => ({
            date,
            COP: val.COP,
          }));
          setHistory(formatted);
        }
      } catch (err) {
        console.error("Error obteniendo histórico:", err);
      }
    };

    fetchHistory();
  }, []);

  // 📌 Conversión USD → COP
  const handleConvertToCop = () => {
    if (rate && usdAmount) {
      setCopResult((usdAmount * rate).toFixed(2));
      setUsdResult(null);
    }
  };

  // 📌 Conversión COP → USD
  const handleConvertToUsd = () => {
    if (rate && copAmount) {
      setUsdResult((copAmount / rate).toFixed(2));
      setCopResult(null);
    }
  };

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
          <Link to="/dollar" className="active">
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

      {/* Main */}
      <main className="main-content">
        <header className="header">
          <h1>Dólar</h1>
          <div className="acciones">
            <button className="btn-icon">
              <img src="/img/campana.png" alt="Notificaciones" />
            </button>
            <button className="btn-icon">
              <img src="/img/configuraciones.png" alt="Configuración" />
            </button>
          </div>
        </header>

        <div className="dollar-container">
          {/* Columna izquierda */}
          <div className="dollar-left">
            <div className="dollar-card">
              <h3>💵 Cotización actual</h3>
              <p className="dollar-price">
                {rate ? `$${rate.toLocaleString("es-CO")} COP` : "Cargando..."}
              </p>
              <p className="dollar-date">Fuente: open.er-api.com & exchangerate.host</p>
            </div>

            <div className="dollar-graph">
              <h4>📈 Últimos 7 días</h4>
              {history.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={history}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="COP" stroke="#4f46e5" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p>Cargando gráfico...</p>
              )}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="dollar-right">
            <div className="dollar-card conversor">
              <h4>Convertir divisas</h4>

              {/* USD → COP */}
              <div className="convert-box">
                <input
                  type="number"
                  placeholder="USD"
                  className="dollar-input"
                  value={usdAmount}
                  onChange={(e) => setUsdAmount(e.target.value)}
                />
                <button className="dollar-btn" onClick={handleConvertToCop}>
                  ➡ Convertir a COP
                </button>
              </div>
              {copResult && <p className="dollar-result">Resultado: ${copResult} COP</p>}

              <hr />

              {/* COP → USD */}
              <div className="convert-box">
                <input
                  type="number"
                  placeholder="COP"
                  className="dollar-input"
                  value={copAmount}
                  onChange={(e) => setCopAmount(e.target.value)}
                />
                <button className="dollar-btn" onClick={handleConvertToUsd}>
                  ➡ Convertir a USD
                </button>
              </div>
              {usdResult && <p className="dollar-result">Resultado: ${usdResult} USD</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dollar;

