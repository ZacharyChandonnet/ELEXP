import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import "./CSS/Layout.css";

const Layout = () => {

  const { user } = useAuth();

  return (
    <div className="layout">
      <div>
        <Header />
      </div>
      <main>
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
