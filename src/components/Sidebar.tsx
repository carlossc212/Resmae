import React, { useEffect, useState } from "react";

interface Props {
  onViewChanged: (view: "dashboard" | "invoices" | "products" | "settings") => void;
}

const Sidebar = ({ onViewChanged }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className={`sidebar ${collapsed ? "close" : ""}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="/src/logo.jpeg" alt="Facmae" />
          </span>
          <div className="text logo-text">
            <span className="name">Facmae</span>
            <span className="profession">Facturas</span>
          </div>
        </div>
        {/* Si se quiere excluir del tab order el input, se asigna tabIndex={-1}; 
            si se quiere permitir, usar tabIndex={0} */}
        <div
          className="toggle"
          onClick={() => setCollapsed(!collapsed)}
          tabIndex={-1}
        >
          <img src="/src/icons/bx-chevron-right.svg" alt="Toggle" />
        </div>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box" tabIndex={-1}>
            <div
              className="icon search-icon"
              onClick={() => setCollapsed(false)}
              tabIndex={-1}
            ></div>
            <input type="text" placeholder="Buscar..." tabIndex={0} />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <a
                href="#home"
                tabIndex={0}
                onClick={() => onViewChanged("dashboard")}
              >
                <div className="icon home-icon"></div>
                <span className="text nav-text">Inicio</span>
              </a>
            </li>
            <li className="nav-link">
              <a
                href="#invoices"
                tabIndex={0}
                onClick={() => onViewChanged("invoices")}
              >
                <div className="icon invoices-icon"></div>
                <span className="text nav-text">Facturas</span>
              </a>
            </li>
            <li className="nav-link">
              <a
                href="#products"
                tabIndex={0}
                onClick={() => onViewChanged("products")}
              >
                <div className="icon products-icon"></div>
                <span className="text nav-text">Productos</span>
              </a>
            </li>
            <li className="nav-link">
              <a
                href="#settings"
                tabIndex={0}
                onClick={() => onViewChanged("settings")}
              >
                <div className="icon settings-icon"></div>
                <span className="text nav-text">Configuración</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content" tabIndex={-1}>
          <li className="exit-button nav-link">
            <a
              onClick={() => window.close()}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.close();
                }
              }}
            >
              <div className="icon exit-icon"></div>
              <span className="text nav-text">Salir</span>
            </a>
          </li>
          <li className="mode" 
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setDarkMode(!darkMode);
                }
              }}
              >
            <div className="sun-moon" tabIndex={-1}>
              <i className="icon sun-icon sun" tabIndex={-1}></i>
              <i className="icon moon-icon moon" tabIndex={-1}></i>
            </div>
            <span className="mode-text text" tabIndex={-1}>
              Modo {darkMode ? "oscuro" : "claro"}
            </span>
            <div
              className="toggle-switch"
              onClick={() => setDarkMode(!darkMode)}>
              <span className="switch" tabIndex={-1}></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;