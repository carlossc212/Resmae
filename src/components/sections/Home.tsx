import React from "react";
import Invoices from "../views/Invoices";
import Products from "../views/Products";
import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";

interface Props {
    active: "dashboard" | "invoices" | "products" | "settings";
}

const Home = ({ active }: Props) => {
  return (
    <>
      <section className="home">
        <Dashboard className={active === "dashboard" ? "active" : ""} />

        <Invoices className={active === "invoices" ? "active" : ""} />

        <Products className={active === "products" ? "active" : ""} />

        <Settings className={active === "settings" ? "active" : ""} />
      </section>
    </>
  );
};

export default Home;
