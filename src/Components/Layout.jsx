import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import "./CSS/Layout.css";
import React from "react";
import { gsap } from "gsap";

const Layout = () => {




  return (
    <div className="layout" >
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
