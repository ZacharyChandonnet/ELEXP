import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth } from "./Context/AuthContext";
import LayouthAuth from "./Components/LayouthAuth";
import Layout from "./Components/Layout";
import Accueil from "./Components/Pages/Accueil";
import Tendances from "./Components/Pages/Tendances";
import Profil from "./Components/Pages/Profil";
import Entrainements from "./Components/Pages/Entrainements";
import Propos from "./Components/Pages/Propos";
import DetailsTendance from "./Components/DetailsTendance";
import { motion, useScroll } from "framer-motion";
import ContactDetails from "./Components/ContactDetails";



function App() {
  const { user } = useAuth();
  const { scrollYProgress } = useScroll();
 

  const routes = [
    {
      path: "/",
      element: <LayouthAuth />,
    },
    {
      path: "*",
      element: <Navigate to={user === null ? "/" : "/"} replace />,
    },
  ];

  const routesLogged = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "accueil",
          element: <Accueil />,
        },
        {
          path: "a-propos",
          element: <Propos />,
        },
        {
          path: "entrainements",
          element: <Entrainements />,
        },
        {
          path: "programmes",
          element: <Tendances />,
        },
        {
          path: "programmes/:id",
          element: <DetailsTendance />,
        },
        {
          path: "profil",
          element: <Profil />,
        },
        {
          path: "Contact/:uuid",
          element: <ContactDetails />,
        },
        {
          path: "",
          element: <Navigate to="/accueil" replace />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <Navigate to={user === null ? "/accueil" : "/accueil"} replace />
      ),
    },
  ];

  return (

    <RouterProvider
      router={createBrowserRouter(user === null ? routes : routesLogged)}
    />

  );
}

export default App;
