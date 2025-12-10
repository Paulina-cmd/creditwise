import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/estilos.css";
import AlertaModal from "../components/AlertaModal";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rolID] = useState(2);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Al cargar la página de registro, limpiar sesión anterior
  useEffect(() => {
    sessionStorage.clear();
    localStorage.clear();
  }, []);

  const camposCompletos =
    nombre.trim() !== "" &&
    documento.trim() !== "" &&
    contrasena.trim() !== "" &&
    aceptaTerminos;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // 🔹 Validaciones Frontend
    if (!camposCompletos) {
      setError("Por favor completa todos los campos y acepta los términos.");
      return;
    }

    if (!/^\d{6,}$/.test(documento)) {
      setError("El documento debe tener al menos 6 dígitos numéricos");
      return;
    }

    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!/[A-Z]/.test(contrasena) || !/[a-z]/.test(contrasena) || !/\d/.test(contrasena)) {
      setError("La contraseña debe incluir mayúsculas, minúsculas y números");
      return;
    }

    try {
      const nuevoUsuario = {
        nombre: nombre.trim(),
        documento: documento.trim(),
        contrasena: contrasena.trim(),
        RolID: rolID,
      };

      const response = await axios.post(
        "http://localhost:8000/usuarios/register",
        nuevoUsuario
      );

      if (response.data && response.data.message) {
        alert("Usuario registrado exitosamente. ¡Por favor inicia sesión!");
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.detail || "Error al registrar usuario");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="/img/logo.png" alt="Logo CreditWise" />
        <h2>¡La forma divertida, efectiva y gratis</h2>
        <h2>de aprender finanzas!</h2>
      </div>

      <div className="login-right">
        <h1>
          Registro <span>CreditWise</span>
        </h1>

        <form className="login-form" onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nombre <span style={{color: 'red'}}>*</span></label>
            <input
              type="text"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Documento <span style={{color: 'red'}}>*</span></label>
            <input
              type="text"
              placeholder="Ingrese su documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Contraseña <span style={{color: 'red'}}>*</span></label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
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
            disabled={!camposCompletos}
            style={{
              opacity: camposCompletos ? "1" : "0.6",
              cursor: camposCompletos ? "pointer" : "not-allowed",
              transition: "0.3s ease",
            }}
          >
            Registrar
          </button>
        </form>

        <div className="login-extra">
          <p>
            ¿Ya tienes cuenta?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "#ad4ee9" }}
            >
              Inicia sesión
            </span>
          </p>
        </div>
      </div>

      <AlertaModal mensaje={error} onClose={() => setError("")} />
    </div>
  );
}

export default Registro;

