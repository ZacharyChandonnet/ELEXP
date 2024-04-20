import { useUser } from "../Context/UserContext";
import { useEffect, useState } from "react";
import ChoixExercices from "../Data/Exercices.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowTurnDown } from "react-icons/fa6";
import "./Createworkout.css";

const Createworkout = () => {
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState({});
  const [openPopup, setOpenPopup] = useState("");
  const [experience, setExperience] = useState(0);
  const [isAbleToCreate, setIsAbleToCreate] = useState(false);
  const { createWorkout, user } = useUser();

  useEffect(() => {
    if (user) {
      setExperience(user.experience);
    }
  }, [user]);

  useEffect(() => {
    setIsAbleToCreate(experience >= 50);
  }, [experience]);

  const exerciseThresholds = {
    Jambes: {
      "Soulevé de terre": 100,
      "Presse à cuisses": 150,
    },
  };

  const toggleExercise = (muscleGroup, exerciseName) => {
    const updatedSelectedExercises = { ...selectedExercises };
    const requiredExperience =
      exerciseThresholds[muscleGroup]?.[exerciseName] || 0;

    if (experience < requiredExperience) {
      console.log(
        `Vous avez besoin de ${requiredExperience} d'expérience pour débloquer cet exercice.`
      );
      return;
    }

    if (updatedSelectedExercises[muscleGroup]?.includes(exerciseName)) {
      updatedSelectedExercises[muscleGroup] = updatedSelectedExercises[
        muscleGroup
      ].filter((exercise) => exercise !== exerciseName);
    } else {
      updatedSelectedExercises[muscleGroup] = updatedSelectedExercises[
        muscleGroup
      ]
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
    setWorkoutName("");
  };

  return (
    <div className="pt-12 pb-12">
      <h2 className="font-titre uppercase pb-4">Créer un entraînement</h2>
      <div className="grid grid-cols-1 ">
        {Object.entries(ChoixExercices.exercices).map(
          ([muscleGroup, exercises]) => (
            <div
              className=" grid grid-cols-1 items-center border-b-2 border-dark mb-8  mt-4 cursor-pointer"
              key={muscleGroup}
              onMouseEnter={() => isAbleToCreate && togglePopup(muscleGroup)}
              onMouseLeave={() => isAbleToCreate && togglePopup(muscleGroup)}
            >
              <h3 className="text-xl font-semibold">{muscleGroup}</h3>
              <AnimatePresence>
                {openPopup === muscleGroup && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="popup"
                  >
                    {exercises.map((exercise) => (
                      <label
                        key={exercise.id}
                        className="flex items-center cursor-pointer "
                      >
                        {exercise.name}
                        <input
                          type="checkbox"
                          value={exercise.name}
                          checked={selectedExercises[muscleGroup]?.includes(
                            exercise.name
                          )}
                          onChange={() =>
                            toggleExercise(muscleGroup, exercise.name)
                          }
                          className="mr-2"
                          disabled={
                            experience <
                            (exerciseThresholds[muscleGroup]?.[exercise.name] ||
                              0)
                          }
                        />
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        )}
      </div>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Nom de l'entraînement"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          disabled={!isAbleToCreate}
        />
        <button onClick={handleCreateWorkout} disabled={!isAbleToCreate}>
          Créer l'entraînement
        </button>
      </div>
    </div>
  );
};

export default Createworkout;
