import React, { useState, useEffect } from "react";

interface Props {
  className?: string;
}

const Settings = ({ className }: Props) => {
  // Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Estado para confirmaciones al salir (por defecto activado)
  const [exitConfirm, setExitConfirm] = useState(() => {
    const stored = localStorage.getItem("exitConfirm");
    return stored !== null ? stored === "true" : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("exitConfirm", exitConfirm.toString());
  }, [exitConfirm]);

  return (
    <div id="settings" className={`view ${className}`}>
      <h2 className="title">
        <span>Configuración</span>
      </h2>

      <div className="settings-content">
        {/* Toggle para modo oscuro */}
        <div
          className="setting-item"
          tabIndex={0}
          onClick={() => setDarkMode(!darkMode)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setDarkMode(!darkMode);
            }
          }}
        >
          <div className="settings-icons" tabIndex={-1}>
            <i className="icon sun-icon sun" tabIndex={-1}></i>
            <i className="icon moon-icon moon" tabIndex={-1}></i>
          </div>
          <span className="settings-text" tabIndex={-1}>
            Modo {darkMode ? "oscuro" : "claro"}
          </span>
          <div className={`toggle-switch ${darkMode ? "active" : ""}`}>
            <span className="switch" tabIndex={-1}></span>
          </div>
        </div>

        {/* Toggle para confirmaciones al salir */}
        <div
          className="setting-item"
          tabIndex={0}
          onClick={() => setExitConfirm(!exitConfirm)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setExitConfirm(!exitConfirm);
            }
          }}
        >
          <div className="settings-icons" tabIndex={-1}>
            <i className="icon exit-confirmation" tabIndex={-1}></i>
          </div>
          <span className="settings-text" tabIndex={-1}>
            Confirmaciones al salir {exitConfirm ? "activadas" : "desactivadas"}
          </span>
          <div className={`toggle-switch ${exitConfirm ? "active" : ""}`}>
            <span className="switch" tabIndex={-1}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;