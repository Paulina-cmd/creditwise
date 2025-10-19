import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/estilos.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const backendUrl = "http://localhost:3001";

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${backendUrl}/registro`, {
        nombre,
        documento,
        contrasena,
      });

      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      localStorage.setItem("progreso", JSON.stringify(res.data.progreso));

      navigate("/home");
    } catch (err) {
      console.error("Error completo:", err.response || err);
      setError(err.response?.data?.detail || "Error al registrarse");
    }
  };

  // El botón solo está habilitado si todos los campos tienen valor y se acepta T&C
  const isFormValid = nombre && documento && contrasena && aceptaTerminos;

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="img/logo.png" alt="Logo CreditWise" />
        <h2>¡Comienza tu viaje financiero desde cero!</h2>
      </div>

      <div className="login-right">
        <h1>
          Crear cuenta en <span>CreditWise</span>
        </h1>

        {error && <p className="error">{error}</p>}

        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="documento">Documento</label>
            <input
              id="documento"
              type="number"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <div className="terminos">
            <input
              type="checkbox"
              id="terminos"
              checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)}
            />
            <label htmlFor="terminos">
              Acepto los{" "}
              <a href="/terminos" target="_blank" rel="noopener noreferrer">
                Términos y Condiciones
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={!isFormValid}
            style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? "pointer" : "not-allowed" }}
          >
            Registrarse
          </button>
        </form>

        <div className="login-extra">
          <p>
            ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
