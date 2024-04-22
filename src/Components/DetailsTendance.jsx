import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TendanceData from "../Data/TendanceData";
import Heading from "./Heading";
import { useUser } from "../Context/UserContext";
import "./DetailsTendance.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Notification from "./Notification";

const DetailsTendance = () => {
  const { id } = useParams();
  const tendance = TendanceData[id - 1];
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

      <p>
        Temps de récupération avant le prochain workout :{" "}
        {formatCooldown(cooldownRemaining)}
      </p>

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
                  <div className="bg-dark text-white detail">
                    <div className="p-4">
                      <h3 className="font-titre">{detail.name}</h3>
                      <p> Séries - {detail.sets}</p>
                      <p>Répétition - {detail.reps}</p>
                    </div>
                    <figure>
                      <img src={`/${detail.image}`} alt={detail.name} />
                    </figure>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <button onClick={addWorkout}>J'ai complété ce workout</button>

      <Link to="/tendances" className="absolute top-0 left-0 p-4">
        Retour
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
              className="text-white text-3xl"
              onClick={() => setShowPopup(false)}
            >
              {" "}
              <FaTimes />{" "}
            </button>
          </div>
        </motion.div>
      )}

      {notification && (
        <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
          <Notification
            message={
              "Votre workout a bien été ajouté !" + 40 + " points d'expérience"
            }
            redirection="/profil"
          />
        </div>
      )}
    </div>
  );
};

export default DetailsTendance;
