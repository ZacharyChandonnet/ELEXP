import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import TendanceData from "../Data/TendanceData";
import Heading from "./Heading";
import { useUser } from "../Context/UserContext";
import "./CSS/DetailsTendance.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Notification from "./Notification";
import { FaArrowLeftLong } from "react-icons/fa6";

const DetailsTendance = () => {
  const { id } = useParams();
  const tendance = TendanceData[id - 1];
  const location = useLocation();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [notification, setNotification] = useState(false);
  const { ajouterExperience, user, partirTimer, ajouterWorkoutTendance } =
    useUser();

  const ajouterWorkout = () => {
    ajouterWorkoutTendance(tendance.id);
  };

  const tendanceThresholds = [30, 80, 120];

  useEffect(() => {
    if (location.pathname === "/programmes/3") {
      if (user && user.experience < tendanceThresholds[2]) {
        window.location.href = "/programmes";
      }
    }
    if (location.pathname === "/programmes/2") {
      if (user && user.experience < tendanceThresholds[1]) {
        window.location.href = "/programmes";
      }
    }
    if (location.pathname === "/programmes/1") {
      if (user && user.experience < tendanceThresholds[0]) {
        window.location.href = "/programmes";
      }
    }
  }, [user]);



  useEffect(() => {
    if (user && user.cooldown) {
      const currentTime = new Date().getTime();
      const lastWorkoutTime = user.cooldown;
      const cooldownTime = 8 * 60 * 60 * 1000;
      const remainingTime = cooldownTime - (currentTime - lastWorkoutTime);
      if (remainingTime > 0) {
        setCooldownRemaining(remainingTime);
        const intervalId = setInterval(() => {
          setCooldownRemaining((prevRemaining) => {
            if (prevRemaining - 1000 >= 0) {
              return prevRemaining - 1000;
            } else {
              clearInterval(intervalId);
              return 0;
            }
          });
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, [user]);

  const addWorkout = () => {
    if (cooldownRemaining === 0) {
      ajouterExperience(40);
      ajouterWorkout();
      partirTimer();

      setNotification(true);

      setTimeout(() => {
        setNotification(false);
      }, 7000);
    } else {
      console.log(
        "Vous devez attendre avant de pouvoir ajouter un autre workout"
      );
    }
  };

  useEffect(() => {
    const images = document.querySelectorAll(".detail img");
    const loadImagePromises = Array.from(images).map((image) => {
      return new Promise((resolve) => {
        image.onload = resolve;
      });
    });

    Promise.all(loadImagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, [tendance.workouts]);

  const formatCooldown = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleImageClick = (imageUrl) => {
    setShowPopup(true);
    setPopupImage(imageUrl);
  };

  return (
    <div className="relative">
      <Heading title={tendance.title} paragraph={tendance.description} />

      <p className="text-green-600  font bold italic pt-4 text-center">
        *Cet entraînement vaut 40 exp
      </p>

      {cooldownRemaining > 0 && (
        <p className="text-red-500 italic font-bold text-sm py-4">
          *Temps de récupération avant le prochain entraînement :{" "}
          {formatCooldown(cooldownRemaining)}
        </p>
      )}
      <div>
        <div className="detail-container cursor-pointer">
          <AnimatePresence>
            {imagesLoaded &&
              tendance.workouts.map((detail, index) => (
                <motion.div
                  className="detail mt-4"
                  key={index}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.25 }}
                  onClick={() => handleImageClick(`/${detail.image}`)}
                >
                  <div className="bg-dark text-white detail grid grid-cols-1 md:grid-cols-2 items-center">
                    <figure>
                      <img
                        src={`/${detail.image}`}
                        alt={detail.name}
                        style={{ maxHeight: "400px" }}
                      />
                    </figure>
                    <div className="p-6 ">
                      <h3 className="font-titre lg:text-3xl uppercase">
                        {detail.name}
                      </h3>
                      <p className="italic w-3/4 pt-2">{detail.description}</p>
                      <div className="flex gap-8 pt-8 font-bold">
                        <p> Séries - {detail.sets}</p>
                        <p>Répétition - {detail.reps}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: "black",
          color: "white",
          border: "2px solid black",
        }}
        className="text-center border-2 border-dark p-4 w-1/6 mx-auto mb-12 cursor-pointer flex justify-center items-center mt-8"
        onClick={addWorkout}
      >
        J'ai complété cet entraînement
      </motion.button>

      <Link to="/programmes" className="absolute top-0 left-0 p-4">
        <FaArrowLeftLong className="text-3xl text-dark mt-6" />
      </Link>

      {showPopup && (
        <motion.div
          className="popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="popup-content">
            <img src={popupImage} alt="Popup Image" />
            <button
              className="text-white text-3xl bg-dark"
              onClick={() => setShowPopup(false)}
            >
              {" "}
              <FaTimes />{" "}
            </button>
          </div>
        </motion.div>
      )}

      {notification && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification
            message={
              "Votre workout a bien été ajouté !" + 40 + "exp"
            }
            redirection="/profil"
          />
        </div>
      )}
    </div>
  );
};

export default DetailsTendance;
