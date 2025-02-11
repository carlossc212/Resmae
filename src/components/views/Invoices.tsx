import React from "react";

interface Props {
    className?: string;
}

const Invoices = ({ className }: Props) => {
  return (
    <>
      <div id="invoices" className={`view ${className}`}>
        <h2 className="title">
          <span>Facturas</span>{" "}
        </h2>
        <p className="text">Información de facturas.</p>
      </div>
    </>
  );
};

export default Invoices;