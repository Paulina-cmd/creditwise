import { useState } from "react";

const MenuMas = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-mas">
      <button 
        onClick={() => setOpen(!open)} 
        className="btn-mas"
      >
        <img src="/img/mass.png" alt="Más" className="icon" /> Más
      </button>

      {open && (
        <div className="dropdown-mas">
          <hr />
          <div className="dropdown-item">
            <img src="/img/configuraciones.png" alt="Configuración" className="icon" /> Configuración
          </div>
          <div className="dropdown-item">
            <img src="/img/signo-de-interrogacion.png" alt="Ayuda" className="icon" /> Ayuda
          </div>
          <div className="dropdown-item salir">
            <img src="/img/cerrar-sesion.png" alt="Salir" className="icon" /> Cerrar sesión
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuMas;
