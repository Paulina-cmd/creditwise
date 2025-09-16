import { Link } from "react-router-dom";
import "../assets/css/estilos.css"; // reutilizamos el mismo CSS del login

export default function Registro() {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Lado izquierdo */}
        <div className="login-left">
          <h1>
            <span>CreditWise</span>
          </h1>
          <img src="/img/logo.png" alt="Logo CreditWise" className="logo-login" />
          <h2>Tu camino a una mejor vida crediticia empieza aquí 🚀</h2>
        </div>

        {/* Lado derecho */}
        <div className="login-right">
          <h1>Crear cuenta en <span>CreditWise</span></h1>

          <form className="login-form">
            <input type="text" placeholder="Nombre completo" />
            <input type="email" placeholder="Correo electrónico" />
            <input type="text" placeholder="Usuario o teléfono" />
            <input type="password" placeholder="Contraseña" />
            <input type="password" placeholder="Confirmar contraseña" />
          </form>

          <button className="btn-login">Registrarse</button>

          <div className="texto-inferior">
            <p>
              ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
            </p>
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
