import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.addEventListener("dragstart", (event) => {
  event.preventDefault(); // Bloquea el arrastre de imágenes y otros elementos
});