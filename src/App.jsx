import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useAuth } from "./Context/AuthContext";
import LayouthAuth from "./Components/LayouthAuth";

import Layout from "./Components/Layout";
import Accueil from "./Components/Accueil";
import Tendances from "./Components/Tendances";
import Profil from "./Components/Profil";
// import Forum from "./Components/Forum";
import Entrainements from "./Components/Entrainements";
import Propos from "./Components/Propos";
import DetailsTendance from "./Components/DetailsTendance";
import { useEffect } from "react";


function App() {
  const { user } = useAuth();



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
          path: "tendances",
          element: <Tendances />,
        },
        {
          path: "tendances/:id",
          element: <DetailsTendance />,
        },
        // {
        //   path: "forum",
        //   element: <Forum />,
        // },
        {
          path: "profil",
          element: <Profil />,
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
