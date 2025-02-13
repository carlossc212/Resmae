import React, { useState, useEffect, useRef } from "react";

interface Props {
  className?: string;
}

const Settings = ({ className }: Props) => {
  // Inicializa darkMode a partir de localStorage (si existe) o por defecto en false
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    // Guarda el estado en localStorage y actualiza la clase en body
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <div id="settings" className={`view ${className}`}>
        <h2 className="title">
          <span>Configuración</span>
        </h2>
        <div className="settings-content">
          <div className="setting-item">
            <div className="mode" tabIndex={0}
              onClick={() => setDarkMode(!darkMode)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setDarkMode(!darkMode);
                }
              }}
            >
              <div className="sun-moon" tabIndex={-1}>
                <i className="icon sun-icon sun" tabIndex={-1}></i>
                <i className="icon moon-icon moon" tabIndex={-1}></i>
              </div>
              <span className="settings-text" tabIndex={-1}>
                Modo {darkMode ? "oscuro" : "claro"}
              </span>
              <div className="toggle-switch">
                <span className="switch" tabIndex={-1}></span>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </>
  );
};

export default Settings;