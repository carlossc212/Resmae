import React from "react";

interface Props {
    className?: string;
}

const Dashboard = ({ className }: Props) => {
  return (
    <>
      <div id="home" className={`view ${className}`}>
        <h2 className="title">
          <span>Inicio</span>
        </h2>
        <p className="text">Bienvenido al panel de control.</p>
      </div>
    </>
  );
};

export default Dashboard;
