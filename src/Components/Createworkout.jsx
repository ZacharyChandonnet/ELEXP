import { useUser } from "../Context/UserContext";
import { useEffect, useState } from "react";
import ChoixExercices from "../Data/Exercices.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowTurnDown } from "react-icons/fa6";
import "./CSS/Createworkout.css";
import Notification from "./Notification";

const Createworkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState({});
  const [openPopup, setOpenPopup] = useState("");
  const [experience, setExperience] = useState(0);
  const [isAbleToCreate, setIsAbleToCreate] = useState(false);
  const { createWorkout, user } = useUser();
  const [notification, setNotification] = useState(false);
  const [notificationExercices, setNotificationExercices] = useState(false);

  useEffect(() => {
    if (user) {
      setExperience(user.experience);
    }
  }, [user]);

  useEffect(() => {
    setIsAbleToCreate(experience >= 40);
  }, [experience]);

  const exerciseThresholds = {
    Jambes: {
      "Marche avec des poids": 150,
      "Soulevé de terre": 425,
      "Presse à cuisses": 150,
      "Sauts en boîte": 200,
      Fentes: 75,
    },
    Dos: {
      "Tirage bûcheron": 210,
      "Haussement d’épaules": 45,
    },
    Pec: {
      Dips: 230,
      "Développé couché": 95,
      "Développé décliné": 130,
    },
    Épaules: {
      "Élévation postérieure": 500,
      "Rowing menton": 160,
      "Développé Arnold": 60,
    },
    Biceps: {
      "Curl haltères": 250,
      "Curl incliné": 145,
    },
    Triceps: {
      Dips: 230,
      "Barre au front": 310,
    },
  };

  const choisirExercices = (muscleGroup, nomExerice) => {
    const updatedSelectedExercises = { ...selectedExercises };

    const isSelected =
      updatedSelectedExercises[muscleGroup] &&
      updatedSelectedExercises[muscleGroup].includes(nomExerice);

    if (isSelected) {
      updatedSelectedExercises[muscleGroup] = updatedSelectedExercises[
        muscleGroup
      ].filter((exercise) => exercise !== nomExerice);
    } else {
      updatedSelectedExercises[muscleGroup] = (
        updatedSelectedExercises[muscleGroup] || []
      ).concat(nomExerice);
    }
    setSelectedExercises(updatedSelectedExercises);
  };

  const togglePopup = (muscleGroup) => {
    setOpenPopup(openPopup === muscleGroup ? "" : muscleGroup);
  };

  const handleCreateWorkout = () => {
    if (workoutName.trim() === "" || Object.keys(selectedExercises).length === 0) {
      console.log("Veuillez choisir un nom d'entraînement et sélectionner au moins un exercice.");
      return; 
    }
    createWorkout(workoutName, Object.values(selectedExercises).flat());
    if (Object.values(selectedExercises).flat().length <= 7) {
      setNotification(true);
    }else{
      setNotificationExercices(true);
    }
  
    setTimeout(() => {
      setNotification(false);
      setNotificationExercices(false);
    }, 7000);
  
    setWorkoutName("");
    setSelectedExercises({});
  };

  return (
    <div className="pt-12 pb-12 pageBlur">
      <h2 className="font-titre uppercase pb-4">Créer un entraînement</h2>
      <span
        className="text-red-500 italic pb-4 font-bold"
        style={{ display: experience >= 40 ? "none" : "block" }}
      >
        Tu as {experience} expérience, tu as besoin de 40 pour créer un
        entraînement.
      </span>
      <div
        className="grid grid-cols-1 "
        style={{ filter: isAbleToCreate ? "none" : "blur(10px)" }}
      >
        {Object.entries(ChoixExercices.exercices).map(
          ([muscleGroup, exercises]) => (
            <motion.div
              whileHover={{
                backgroundColor: "#0D0D0D",
                color: "#fff",
              }}
              key={muscleGroup}
            >
              <div
                className="border-t-2 border-dark p-2 py-6 flex flex-col items-start cursor-pointer"
                onMouseEnter={() => isAbleToCreate && togglePopup(muscleGroup)}
                onMouseLeave={() => isAbleToCreate && togglePopup(muscleGroup)}
                onTouchStart={() => isAbleToCreate && togglePopup(muscleGroup)}
              >
                <h3 className="text-4xl uppercase font-titre">{muscleGroup}</h3>
                <AnimatePresence>
                  {openPopup === muscleGroup && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="lg:flex lg:flex-wrap"
                    >
                      {exercises.map((exercise, index) => (
                        <div
                          key={exercise.id}
                          className={`flex items-center cursor-pointer p-2 listeExercices${
                            experience <
                            (exerciseThresholds[muscleGroup]?.[exercise.name] ||
                              0)
                              ? ""
                              : selectedExercises[muscleGroup]?.includes(
                                  exercise.name
                                )
                              ? " bg-white text-dark"
                              : ""
                          }`}
                          onClick={() =>
                            choisirExercices(muscleGroup, exercise.name)
                          }
                        >
                          <div className="flex items-center">
                            <p>
                              {experience <
                              (exerciseThresholds[muscleGroup]?.[
                                exercise.name
                              ] || 0) ? (
                                <span className="filter blur-sm">
                                  {exercise.name}
                                </span>
                              ) : (
                                exercise.name
                              )}
                            </p>
                            <p
                              className="ml-2 text-red-500"
                              style={{
                                display:
                                  experience >=
                                  (exerciseThresholds[muscleGroup]?.[
                                    exercise.name
                                  ] || 0)
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {exerciseThresholds[muscleGroup]?.[exercise.name]} exp nécessaire
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            value={exercise.name}
                            checked={selectedExercises[muscleGroup]?.includes(
                              exercise.name
                            )}
                            onChange={() =>
                              toggleExercise(muscleGroup, exercise.name)
                            }
                            disabled={
                              experience <
                              (exerciseThresholds[muscleGroup]?.[
                                exercise.name
                              ] || 0)
                            }
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        )}
      </div>

      {experience >= 40 && (
        <div className="flex flex-col justify-center mt-8">
          <input
            type="text"
            placeholder="Nom de l'entraînement"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            disabled={!isAbleToCreate}
            className="border-b-2 border-dark p-2 mt-4 cwText"
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "white",
              color: "black",
              border: "2px solid black",
            }}
            onClick={handleCreateWorkout}
            disabled={!isAbleToCreate}
            className="bg-dark text-white p-2 mt-4 cursor-pointer lg:w-1/6 "
          >
            
            <p>
              <a href="#entrainements">Créer l'entraînement</a></p>
          </motion.button>
        </div>
      )}

      {notification && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Ton entraînement a bien été créé !"} />
        </div>
      )}

      {notificationExercices && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Erreur: Maximum de 7 exercices par entraînement"} />
        </div>
      )}

    </div>
  );
};

export default Createworkout;
