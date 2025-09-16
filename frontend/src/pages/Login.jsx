// src/pages/Login.jsx
import { Link } from "react-router-dom";
import "../assets/css/estilos.css";

export default function Login() {
  return (
    <div className="login-page">
      {/* Contenedor principal */}
      <div className="login-container">
        {/* Lado izquierdo con imagen/ilustración */}
        <div className="login-left">
          <img src="/img/logo.png" alt="Logo" className="login-logo" />
          <h2>¡La forma divertida, efectiva y gratis de aprender finanzas!</h2>
        </div>

        {/* Lado derecho con formulario */}
        <div className="login-right">
          <h1>
            Bienvenido a <span>CreditWise</span>
          </h1>

          <form className="login-form">
            <input type="text" placeholder="Usuario o correo" />
            <input type="password" placeholder="Contraseña" />
          </form>
          <Link to="/home">
            <button type="submit" className="btn-login">
              Iniciar sesión
            </button>
          </Link>
          <div className="login-extra">
            <Link to="/registro">¿No tienes cuenta? Regístrate</Link>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CreditWise. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos y Condiciones</a>
          <a href="#">Contacto</a>
        </div>
      </footer>
    </div>
  );
}
