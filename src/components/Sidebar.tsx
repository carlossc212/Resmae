import React, { useEffect, useState } from "react";

interface Props{
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
        <div className="toggle" onClick={()=>setCollapsed(!collapsed)}>
          <img src="/src/icons/bx-chevron-right.svg" />
        </div>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box" >
            <div className="icon search-icon" onClick={()=> setCollapsed(false)}></div>
            <input type="text" placeholder="Buscar..." />
          </li>
          <ul className="menu-links">
            <ul className="menu-links">
              <li className="nav-link">
                <a href="#home" onClick={()=>onViewChanged("dashboard")}>
                  <div className="icon home-icon"></div>
                  <span className="text nav-text">Inicio</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#invoices" onClick={()=>onViewChanged("invoices")}>
                  <div className="icon invoices-icon"></div>
                  <span className="text nav-text">Facturas</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#products" onClick={()=>onViewChanged("products")}>
                  <div className="icon products-icon"></div>
                  <span className="text nav-text">Productos</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#settings" onClick={()=>onViewChanged("settings")}>
                  <div className="icon settings-icon"></div>
                  <span className="text nav-text">Configuración</span>
                </a>
              </li>
            </ul>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="exit-button">
            <a onClick={()=>window.close()}>
              <div className="icon exit-icon"></div>
              <span className="text nav-text">Salir</span>
            </a>
          </li>
          <li className="mode">
            <div className="sun-moon">
              <i className="icon sun-icon sun"></i>
              <i className="icon moon-icon moon"></i>
            </div>
            <span className="mode-text text">Modo {darkMode ? "oscuro":"claro"}</span>
            <div className="toggle-switch" onClick={()=>setDarkMode(!darkMode)}>
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
