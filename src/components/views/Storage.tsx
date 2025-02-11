import React from "react";

interface Props {
    className?: string;
}

const Storage = ({ className }: Props) => {
  return (
    <>
      <div id="storage" className={`view ${className}`}>
        <h2 className="title">
          <span>Almacén</span>{" "}
        </h2>
        <p className="text">Información del almacén.</p>
      </div>
    </>
  );
};

export default Storage;