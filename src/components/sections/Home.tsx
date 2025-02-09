import React from "react";
import Invoices from "../views/Invoices";
import Products from "../views/Products";
import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";

interface Props {
    active: "dashboard" | "invoices" | "products" | "settings";
}

const Home = ({ active }: Props) => {
  const views: Record<string, React.JSX.Element> = {
    dashboard: <Dashboard className="active" />,
    invoices: <Invoices className="active" />,
    products: <Products className="active" />,
    settings: <Settings className="active" />
  };
  
  return (
    <>
      <section className="home">
        {views[active]}
      </section>
    </>
  );
};

export default Home;
