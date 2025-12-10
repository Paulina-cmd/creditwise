import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuMas from "../components/MenuMas";
import "../assets/css/estilos.css";

const Dollar = () => {
  const [rate, setRate] = useState(null);
  const [usdAmount, setUsdAmount] = useState("");
  const [copAmount, setCopAmount] = useState("");
  const [copResult, setCopResult] = useState(null);
  const [usdResult, setUsdResult] = useState(null);

  // Cotización actual
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

  // Conversión
  const handleConvertToCop = () => {
    if (rate && usdAmount) {
      setCopResult((usdAmount * rate).toFixed(2));
      setUsdResult(null);
    }
  };

  const handleConvertToUsd = () => {
    if (rate && copAmount) {
      setUsdResult((copAmount / rate).toFixed(2));
      setCopResult(null);
    }
  };

  // Recomendación simple
  const renderRecommendation = () => {
    if (!rate) return <p>Cargando recomendación...</p>;
    if (rate < 4900) {
      return <p>📈 El dólar está bajo. Puede ser buen momento para comprar USD.</p>;
    } else if (rate > 5100) {
      return <p>📉 El dólar está alto. No es recomendable comprar USD ahora.</p>;
    } else {
      return <p>➡ El dólar está estable. Mantén tus inversiones actuales.</p>;
    }
  };

  // Información de casas de cambio y apps
  const renderGuide = () => (
    <ul className="exchange-list">
      <li>
        <strong>Globo Cambio</strong> 
        <br />Oficina de cambio de divisas, más de 20 años de actividad  
        <br />Dirección: Av. El Dorado #103-09  
        <br />Abierto las 24 horas · Tel: 01-800-0180433    
        <br /><a href="https://www.globocambio.co/es/inicio" target="_blank">Sitio web</a> · <a href="https://www.google.com/maps/dir/4.5809664,-74.1605376/Globo+Cambio,+Av.+El+Dorado+%23103-09,+Bogot%C3%A1/@4.6373357,-74.1691349,13z/data=!3m2!4b1!5s0x8e3f9cb9fdeb04ab:0xc648fe62f9ccdb5!4m9!4m8!1m1!4e1!1m5!1m1!1s0x8e3f9cb9fc82d9cb:0x49cafab9e15c70c3!2m2!1d-74.1406766!2d4.6980998?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D">Ruta</a>
      </li>
      <li>
        <strong>Cambios Güendi</strong> 
        <br />Oficina de cambio de divisas, más de 15 años de actividad  
        <br />Dirección: Terminal 1, Av. El Dorado #103-09  
        <br />Abierto las 24 horas · Tel: 320 5771738    
        <br /><a href="https://www.cambiosguendi.com/">Sitio web</a> · <a href="https://www.google.com/maps/dir//Cambios+G%C3%BCendi,+Terminal+1,+Av.+El+Dorado+%23103-09,+Bogot%C3%A1/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x8e3f9cb755f1370b:0x378b4b00d310da77?sa=X&ved=1t:57443&ictx=111">Ruta</a>
      </li>
      <li>
        <strong>Alcansa</strong> 
        <br />Oficina de cambio de divisas, más de 10 años de actividad  
        <br />Dirección: Av. El Dorado #103-09  
        <br />Abierto las 24 horas · Tel: 311 8996304   
        <br /><a href="https://www.google.com/maps/dir//Alcansa,+Av.+El+Dorado+%23103-09,+Bogot%C3%A1/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x8e3f9cb0aeabbb1b:0x1bb287693e8f0a20?sa=X&ved=1t:57443&ictx=111">Ruta</a>
      </li>
    </ul>
  );

  return (
    <div className="app-container page-transition">
      {/* Sidebar */}
      <aside className="sidebar sidebar-appear">
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
      <main className="main-content content-appear">
        <header className="header">
          <h1>Dólar</h1>
        </header>

        <div className="dollar-container">
          {/* Columna izquierda */}
          <div className="dollar-left">
            {/* Cotización actual */}
            <div className="dollar-card card-appear">
              <h3>💵 Cotización actual</h3>
              <p className="dollar-price">
                {rate ? `$${rate.toLocaleString("es-CO")} COP` : "Cargando..."}
              </p>
              <p className="dollar-date">Fuente: open.er-api.com</p>
            </div>

            {/* Recomendación según cotización */}
            <div className="dollar-card card-appear">
              <h4>💡 Recomendación</h4>
              {renderRecommendation()}
            </div>

            {/* Guía de casas de cambio y apps */}
            <div className="dollar-card card-appear">
              <h4>🏦 Casas de cambio recomendadas</h4>
              {renderGuide()}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="dollar-right">
            <div className="dollar-card conversor card-appear">
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
                <button className="dollar-btn btn-hover" onClick={handleConvertToCop}>
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
                <button className="dollar-btn btn-hover" onClick={handleConvertToUsd}>
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
