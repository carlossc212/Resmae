import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/sections/Home";

const App = () => {
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark", darkMode);
  }, []);

  const [active, setActive] = useState<"dashboard" | "invoices" | "products" | "storage" | "settings">("dashboard");
  return (
  <>
    <Sidebar onViewChanged={(view)=>setActive(view)} />
    <Home active={active} />
  </>
  );
};

export default App;