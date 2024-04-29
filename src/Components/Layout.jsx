import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import "./CSS/Layout.css";
import React from "react";
import { gsap } from "gsap";
import Notification from "./Notification";
import { useUser } from "../Context/UserContext";

const Layout = () => {
  const { user } = useUser();
  const [notificationWorkout, setNotificationWorkout] = useState(false);
  const [notificationPullup, setNotificationPullup] = useState(false);
  const [notificationPushup, setNotificationPushup] = useState(false);
  const [notificationLegs, setNotificationLegs] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.experience >= 40 && user.experience <= 60) {
        setNotificationWorkout(true);
      }

      setTimeout(() => {
        setNotificationWorkout(false);
      }, 7000);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (user.experience >= 30 && user.experience <= 30) {
        setNotificationPullup(true);
      }

      setTimeout(() => {
        setNotificationPullup(false);
      }, 7000);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (user.experience >= 80 && user.experience <= 119) {
        setNotificationPushup(true);
      }

      setTimeout(() => {
        setNotificationPushup(false);
      }, 7000);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (user.experience >= 120 && user.experience <= 130) {
        setNotificationLegs(true);
      }

      setTimeout(() => {
        setNotificationLegs(false);
      }, 7000);
    }
  }, [user]);



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

      {notificationWorkout && (
        <div className="fixed top-0 left-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Vous pouvez créer un entraînement !"} />
        </div>
      )}

      {notificationPullup && (
        <div className="fixed top-0 left-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Vous avez débloqué le pogramme Push !"} />
        </div>
      )}

      {notificationPushup && (
        <div className="fixed top-0 left-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Vous avez débloqué le programme Pull !"} />
        </div>
      )}

      {notificationLegs && (
        <div className="fixed top-0 left-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Vous avez débloqué le programme Legs !"} />
        </div>
      )}

    </div>
  );
};

export default Layout;
