import React, { useEffect, useState, useRef } from "react";

interface Props {
  onViewChanged: (
    view: "dashboard" | "invoices" | "products" | "storage" | "settings"
  ) => void;
}

const Sidebar = ({ onViewChanged }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const exitDialogRef = useRef<HTMLDialogElement>(null);

  // Función para manejar la acción de salir
  const handleExit = () => {
    const exitConfirmEnabled = localStorage.getItem("exitConfirm") === "true";
    if (exitConfirmEnabled) {
      exitDialogRef.current?.showModal();
    } else {
      window.close();
    }
  };

  useEffect(() => {
    window.electronAPI.onExitRequest(() => {
      handleExit();
    });
  }, []);

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
                href="#storage"
                tabIndex={0}
                onClick={() => onViewChanged("storage")}
              >
                <div className="icon storage-icon"></div>
                <span className="text nav-text">Almacén</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content" tabIndex={-1}>
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
          <li className="nav-link">
            <a
              onClick={handleExit}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleExit();
                }
              }}
            >
              <div className="icon exit-icon"></div>
              <span className="text nav-text">Salir</span>
            </a>
          </li>
        </div>
      </div>

      <dialog id="exitDialog" ref={exitDialogRef}>
        <form method="dialog" id="exitForm" onSubmit={() => window.close()}>
          <h3>Salir</h3>
          <p>¿Estás seguro?</p>
          <menu>
            <button type="reset" onClick={() => exitDialogRef.current?.close()}>
              Cancelar
            </button>
            <button type="submit">Salir</button>
          </menu>
        </form>
      </dialog>
    </nav>
  );
};

export default Sidebar;