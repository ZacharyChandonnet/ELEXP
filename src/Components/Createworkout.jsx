import { useUser } from "../Context/UserContext";
import { useEffect, useState } from "react";
import ChoixExercices from "../Data/Exercices.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowTurnDown } from "react-icons/fa6";
import "./Createworkout.css";
import Notification from "./Notification";

const Createworkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState({});
  const [openPopup, setOpenPopup] = useState("");
  const [experience, setExperience] = useState(0);
  const [isAbleToCreate, setIsAbleToCreate] = useState(false);
  const { createWorkout, user } = useUser();
  const [notification, setNotification] = useState(false);

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

  const toggleExerciseSelection = (muscleGroup, exerciseName) => {
    const updatedSelectedExercises = { ...selectedExercises };
    const isSelected = updatedSelectedExercises[muscleGroup]?.includes(exerciseName);

    if (isSelected) {
      updatedSelectedExercises[muscleGroup] = updatedSelectedExercises[muscleGroup]?.filter(
        (exercise) => exercise !== exerciseName
      );
    } else {
      updatedSelectedExercises[muscleGroup] = updatedSelectedExercises[muscleGroup]
        ? [...updatedSelectedExercises[muscleGroup], exerciseName]
        : [exerciseName];
    }

    setSelectedExercises(updatedSelectedExercises);
  };

  const togglePopup = (muscleGroup) => {
    setOpenPopup(openPopup === muscleGroup ? "" : muscleGroup);
  };

  const handleCreateWorkout = () => {
    createWorkout(workoutName, Object.values(selectedExercises).flat());
    setNotification(true);

    setTimeout(() => {
      setNotification(false);
    }, 7000);

    setWorkoutName("");
  };

  return (
    <div className="pt-12 pb-12" >
      <h2 className="font-titre uppercase pb-4">Créer un entraînement</h2>
      <span className="text-red-500 italic pb-4 font-bold"
        style={{ display: experience >= 40 ? "none" : "block" }}
      >
        Vous avez {experience} expérience, vous avez besoin de 40 pour créer un entraînement.
      </span>
      <div className="grid grid-cols-1 "
        style={{ filter: isAbleToCreate ? "none" : "blur(10px)" }}
      >
        {Object.entries(ChoixExercices.exercices).map(([muscleGroup, exercises]) => (
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
                    className="flex flex-wrap"
                  >
                    {exercises.map((exercise, index) => (
                      <div
                        key={exercise.id}
                        className={`flex items-center cursor-pointer p-2 ${experience <
                          (exerciseThresholds[muscleGroup]?.[exercise.name] || 0)
                          ? "filter opacity-50"
                          : selectedExercises[muscleGroup]?.includes(exercise.name)
                            ? "bg-white text-dark"
                            : ""
                          }`}
                        style={{ width: "33.33%" }}
                        onClick={() => toggleExerciseSelection(muscleGroup, exercise.name)}
                      >
                        <div className="flex items-center">
                          <p>{exercise.name}</p>
                          <p className="ml-2 text-red-500" style={{ display: experience >= (exerciseThresholds[muscleGroup]?.[exercise.name] || 0) ? "none" : "block" }}>
                            {exerciseThresholds[muscleGroup]?.[exercise.name]}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          value={exercise.name}
                          checked={selectedExercises[muscleGroup]?.includes(exercise.name)}
                          onChange={() => toggleExercise(muscleGroup, exercise.name)}
                          disabled={
                            experience <
                            (exerciseThresholds[muscleGroup]?.[exercise.name] || 0)
                          }
                        />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

      </div>


      {experience >= 40 && (
        <div className="flex flex-col justify-center">
          <input
            type="text"
            placeholder="Nom de l'entraînement"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            disabled={!isAbleToCreate}
            className="border-b-2 border-dark p-2 mt-4 cwText"
          />
          <button onClick={handleCreateWorkout} disabled={!isAbleToCreate} className="bg-dark text-white p-2 mt-4 cursor-pointer w-1/6 ">
            <p>
              Créer l'entraînement
            </p>
          </button>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
          <Notification message={"Votre entraînement a bien été créé !"} />
        </div>
      )}

    </div>

  );
};

export default Createworkout;
