import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/estilos.css";

function Login() {
  const [documento, setDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!documento || !contrasena) {
      setError("Por favor diligencia todos los campos");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Documento: documento,
          Contrasena: contrasena,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Documento o contraseña incorrectos");
        return;
      }

      // Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redirigir al home
      navigate("/home");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("⚠️ Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="img/logo.png" alt="Logo CreditWise" />
        <h2>¡La forma divertida, efectiva y gratis de aprender finanzas!</h2>
      </div>

      <div className="login-right">
        <h1>
          Bienvenido a <span>CreditWise</span>
        </h1>

        {error && <p className="error">{error}</p>}

        <form className="login-form" onSubmit={handleLogin}>
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

          <button type="submit" className="btn-login">
            Iniciar sesión
          </button>
        </form>

        <div className="login-extra">
          <p>
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
