import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/estilos.css";

function Login() {
  const [documento, setDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🧩 Usuarios locales para pruebas
  const usuariosSimulados = [
    { Documento: "123456", Contrasena: "1234", Nombre: "Sara", Rol: "Usuario" },
    { Documento: "987654", Contrasena: "admin", Nombre: "Administrador", Rol: "Admin" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!documento || !contrasena) {
      setError("Por favor diligencia todos los campos");
      return;
    }

    // 🔍 Buscar usuario local
    const usuarioEncontrado = usuariosSimulados.find(
      (u) => u.Documento === documento && u.Contrasena === contrasena
    );

    if (usuarioEncontrado) {
      // Guardar datos simulados en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

      // Redirigir al home
      navigate("/home");
    } else {
      setError("Documento o contraseña incorrectos");
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
