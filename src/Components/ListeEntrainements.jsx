import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import Createworkout from "./Createworkout";
import DailyQuest from "./DailyQuest";
import ChoixExercices from "../Data/Exercices.json";
import { TbDots } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Notification from "./Notification";
import "./CSS/ListeEntrainement.css";
import { motion } from "framer-motion";
import { MdModeEdit } from "react-icons/md";

const ListeEntrainements = () => {
  const {
    afficherWokoutDetails,
    supprimerEntrainement,
    user,
    supprimerExerciceWorkout,
    ajouterExercicesAuWorkout,
    ajouterWorkoutFini,
    modifierNomEntrainement,
  } = useUser();

  const [workouts, setWorkouts] = useState([]);
  const [modifier, setModifier] = useState(false);
  const [ajouter, setAjouter] = useState({ visible: false, workoutId: null });
  const [exercicesSelectionnes, setExercicesSelectionnes] = useState([]);
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [notification, setNotification] = useState(false);
  const [notificationDelete, setNotificationDelete] = useState(false);
  const [notificationAjout, setNotificationAjout] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [notificationWorkout, setNotificationWorkout] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [modifierNom, setModifierNom] = useState(false);

  const handleWorkoutCompleted = (id) => {
    if (cooldownRemaining === 0) {
      ajouterWorkoutFini(id);

      setNotificationWorkout(true);

      setTimeout(() => {
        setNotificationWorkout(false);
      }, 7000);
    }
  };

  const handleModifierNom = async (id, name) => {
    await modifierNomEntrainement(id, name);
    const updatedWorkouts = await afficherWokoutDetails();
    setWorkouts(updatedWorkouts);
    setModifier(false);
  };

  useEffect(() => {
    if (user && user.lastWorkoutTime) {
      const lastWorkoutTime = user.lastWorkoutTime;
      const date = new Date(lastWorkoutTime);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      setConvertTime(formattedTime);
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

  useEffect(() => {
    const getWorkouts = async () => {
      const workouts = await afficherWokoutDetails();
      setWorkouts(workouts);
    };

    getWorkouts();
  }, [afficherWokoutDetails]);

  const experience = user ? user.experience : 0;

  const handleDeleteWorkout = async (id) => {
    await supprimerEntrainement(id);
    const updatedWorkouts = await afficherWokoutDetails();
    setWorkouts(updatedWorkouts);

    setNotification(true);

    setTimeout(() => {
      setNotification(false);
    }, 7000);
  };

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

  const handleDeleteExercice = async (id, exercice) => {
    await supprimerExerciceWorkout(id, exercice);
    const updatedWorkouts = await afficherWokoutDetails();
    setWorkouts(updatedWorkouts);

    setNotificationDelete(true);

    setTimeout(() => {
      setNotificationDelete(false);
    }, 7000);
  };

  const toggleAjouterPopup = (workoutId) => {
    setAjouter({ visible: !ajouter.visible, workoutId: workoutId });
  };

  const choisirExercice = (exercise) => {
    const isSelected = exercicesSelectionnes.includes(exercise);
    if (isSelected) {
      setExercicesSelectionnes(
        exercicesSelectionnes.filter((ex) => ex !== exercise)
      );
    } else {
      setExercicesSelectionnes([...exercicesSelectionnes, exercise]);
    }
  };

  // MÊME CHOSE ICI, J'AI PAS LE CHOIX DE LE FAIRE DANS CETTE COMPOSANTE SINON CA NE FONCTIONNE PAS
  // J'AI ESSAYÉ DE LE FAIRE AVEC UNE NOUVELLE COMPOSANTE MAIS CA NE FONCTIONNE PAS

  const handleAddExercise = async (workoutId) => {
    const exercises = exercicesSelectionnes.map((exercise) => exercise.name);
    await ajouterExercicesAuWorkout(workoutId, exercises);
    const updatedWorkouts = await afficherWokoutDetails();
    setWorkouts(updatedWorkouts);
    setAjouter({ visible: false, workoutId: null });
    setExercicesSelectionnes([]);

    setNotificationAjout(true);

    setTimeout(() => {
      setNotificationAjout(false);
    }, 7000);
  };

  const listeExercices = () => {
    const categories = Object.keys(ChoixExercices.exercices);
    const toggleCategory = (category) => {
      setOpenCategories((prevOpenCategories) => ({
        ...prevOpenCategories,
        [category]: !prevOpenCategories[category],
      }));
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="listePopup"
      >
        <span
          className="close text-white  cursor-pointer absolute top-0 right-0 p-4"
          onClick={toggleAjouterPopup}
        >
          <FaTimes
            size={25} />
        </span>
        <h2 className="font-titre uppercase text-white text-center text-xl pt-8">
          Liste des exercices
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 justify-center items-center mx-auto p-4">
          {categories.map((category) => (
            <div key={category}>
              <h3
                className="cursor-pointer font-titre uppercase lg:text-lg"
                onClick={() => toggleCategory(category)}
              >
                {category} {openCategories[category] ? "▼" : "►"}
              </h3>
              {openCategories[category] && (
                <ul className="overflow-y-scroll lg:overflow-y-hidden mt-2 px-4">
                  {ChoixExercices.exercices[category].map((exercise) => (
                    <motion.li
                      whileHover={{ backgroundColor: "white", color: "black", scale: 1.01 }}
                      transition={{ duration: 0.25 }}
                      key={exercise.id} className="grid grid-cols-2 cursor-pointer"
                      onClick={() => choisirExercice(exercise)}
                    >

                      {exercise.name}
                      {experience >=
                        (exerciseThresholds[category]?.[exercise.name] || 0) ? (
                        <button>
                          {exercicesSelectionnes.includes(exercise) ? (
                            <FaCheck />
                          ) : (
                            <IoMdAdd />
                          )}
                        </button>
                      ) : (
                        <span style={{ color: "red" }}>
                          exp nécessaire :{" "}
                          {exerciseThresholds[category]?.[exercise.name]}
                        </span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <motion.button
          onClick={() => handleAddExercise(ajouter.workoutId)}
          className="border-2 border-white p-2  mx-auto flex items-center justify-center w-1/6"
          whileHover={{
            backgroundColor: "white",
            color: "black",
            scale: 1.05,
            transition: { duration: 0.25 },
          }}
        >
          <p>Ajouter</p>
        </motion.button>
      </motion.div>
    );
  };

  const handleToggleSettings = (workoutId) => {
    setOpenSettingsId(openSettingsId === workoutId ? null : workoutId);
  };


  useEffect(() => {
    const pageBlur = document.querySelectorAll(".pageBlur");
    if (ajouter.visible) {
      document.body.style.overflow = "hidden";

      pageBlur.forEach((element) => {
        element.style.filter = "blur(5px)";
        element.style.transition = "filter 0.5s";
        element.style.opacity = "0.45";
      });
   

    } else {
      document.body.style.overflow = "unset";

      pageBlur.forEach((element) => {
        element.style.filter = "none";
        element.style.transition = "filter 0.5s";
        element.style.opacity = "1";
      });
     
    }
  }, [ajouter.visible]);

  return (
    <section
    >
      <DailyQuest />

      <h2 id="entrainements" className="font-titre uppercase pageBlur">Mes entrainements</h2>
      {cooldownRemaining > 0 && (
        <p className="text-red-500 font-bold italic text-sm p-2">
          Temps de récupération restant avant d'ajouter un autre entrainement:{" "}
          {formatCooldown(cooldownRemaining)}
        </p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
        {workouts && workouts.length === 0 ? (
          <p>Tu n'as pas encore d'entrainements</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="bg-dark text-white relative p-4">
              <h3 className="font-titre text-xl">{workout.name}
                {openSettingsId === workout.id && (
                  <button
                    onClick={() => setModifierNom(!modifierNom)}
                    className="text-white text-lg pl-2"
                  >
                    <MdModeEdit />
                  </button>
                )}

                {modifierNom && openSettingsId === workout.id && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={workout.name}
                      onChange={(e) =>
                        handleModifierNom(workout.id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => setModifierNom(!modifierNom)}
                      className="text-white text-lg"
                    >
                      <FaCheck />
                    </button>

                  </div>

                )}

              </h3>
              <ul>
                {workout.exercices.map((exercise, index) => (
                  <li key={index} className="flex gap-2 items-center">
                    <p>{exercise}</p>
                    {openSettingsId === workout.id && (
                      <button
                        onClick={() =>
                          handleDeleteExercice(workout.id, exercise)
                        }
                        className="text-red-500 text-lg"
                      >
                        <TiDelete />
                      </button>
                    )}
                  </li>
                ))}
                <p className="text-green-500 text-sm font bold italic pt-4">
                  *Cet entrainement vaut {workout.exercices.length * 10} exp
                </p>
                <motion.button
                  onClick={() => handleWorkoutCompleted(workout.id)}
                  className="border-2 border-white p-2 mt-2"
                  whileHover={{
                    backgroundColor: "white",
                    color: "black",
                    scale: 1.05,
                    transition: { duration: 0.25 },
                  }}
                >
                  <p className="text-sm flex items-center gap-2">Terminer <FaCheck /></p>
                </motion.button>
              </ul>

              <div className="absolute top-0 right-0 pt-4 pr-4">
                <TbDots
                  onClick={() => handleToggleSettings(workout.id)}
                  className="cursor-pointer"
                />

                {openSettingsId === workout.id && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleAjouterPopup(workout.id)}
                      className="cursor-pointer text-lg text-green-500"
                    >
                      <IoMdAdd />
                    </button>
                    <button
                      className="text-red-500 text-lg"
                      onClick={() => handleDeleteWorkout(workout.id)}
                    >
                      <FaTrash className="cursor-pointer" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Createworkout />

      {notification && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Ton entrainement a bien été supprimé"} />
        </div>
      )}

      {notificationWorkout && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Ton entrainement a bien été complété"} />
        </div>
      )}

      {notificationDelete && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Ton exercice a bien été supprimé"} />
        </div>
      )}

      {notificationAjout && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification message={"Vos exercices ont bien été ajoutés"} />
        </div>
      )}

      {ajouter.visible && (
        <div>
          <div>{listeExercices()}</div>
        </div>
      )}
    </section>
  );
};

const formatCooldown = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

export default ListeEntrainements;
