import React from "react";

interface Props {
    className?: string;
}

const Settings = ({ className }: Props) => {
  return (
    <>
      <div id="settings" className={`view ${className}`}>
        <h2 className="title">
          <span>Productos</span>
        </h2>
        <p className="text">Ajustes de la aplicación.</p>
      </div>
    </>
  );
};

export default Settings;
