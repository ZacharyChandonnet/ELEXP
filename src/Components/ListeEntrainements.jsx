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

const ListeEntrainements = () => {
  const {
    afficherWokoutDetails,
    supprimerEntrainement,
    user,
    supprimerExerciceWorkout,
    ajouterExercicesAuWorkout,
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
      "Fentes": 75,
    },
    Dos: {
      "Tirage bûcheron": 210,
      "Haussement d’épaules": 45,
    },
    Pec: {
      "Dips": 230,
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
      "Dips": 230,
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
        <span className="close text-white p-4 cursor-pointer" onClick={toggleAjouterPopup}>
          <FaTimes />
        </span>
        <h2 className="font-titre uppercase text-white text-center text-xl">
          Liste des exercices
        </h2> 
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 justify-center items-center mx-auto p-4">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="cursor-pointer" onClick={() => toggleCategory(category)}>
                {category} {openCategories[category] ? "▼" : "►"}
              </h3>
              {openCategories[category] && (
                <ul className="overflow-y-scroll lg:overflow-y-hidden">
                  {ChoixExercices.exercices[category].map((exercise) => (
                    <li key={exercise.id} className="grid grid-cols-2">
                      {exercise.name}
                      {experience >=
                        (exerciseThresholds[category]?.[exercise.name] || 0) ? (
                        <button
                          onClick={() => choisirExercice(exercise)}
                        >
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
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <button onClick={() => handleAddExercise(ajouter.workoutId)} className="border-2 border-white p-2 ml-4">
          <p>
            Ajouter
          </p>
        </button>
      </motion.div>
    );
  };

  const handleToggleSettings = (workoutId) => {
    setOpenSettingsId(openSettingsId === workoutId ? null : workoutId);
  };

  return (
    <section>
      <DailyQuest />

      <h2 className="font-titre uppercase">Mes entrainements</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
        {workouts && workouts.length === 0 ? (
          <p>Vous n'avez pas encore d'entrainements</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="bg-dark text-white relative p-4">
              <h3 className="font-titre text-xl">{workout.name}</h3>
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
        <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
          <Notification message={"Votre entrainement a bien été supprimé"} />
        </div>
      )}

      {notificationDelete && (
        <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
          <Notification message={"Votre exercice a bien été supprimé"} />
        </div>
      )}

      {notificationAjout && (
        <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
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

export default ListeEntrainements;
