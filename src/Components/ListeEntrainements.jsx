import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import Createworkout from "./Createworkout";
import DailyQuest from "./DailyQuest";
import ChoixExercices from "../Data/Exercices.json";
import { TbDots } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

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

  useEffect(() => {
    const getWorkouts = async () => {
      const workouts = await afficherWokoutDetails();
      setWorkouts(workouts);
    };

    getWorkouts();
  }, [afficherWokoutDetails]);

  const handleDeleteWorkout = async (id) => {
    await supprimerEntrainement(id);
    const updatedWorkouts = await afficherWokoutDetails();
    setWorkouts(updatedWorkouts);
  };

  const handleDeleteExercice = async (id, exercice) => {
    await supprimerExerciceWorkout(id, exercice);
    const updatedWorkouts = await afficherWokoutDetails();
    setWorkouts(updatedWorkouts);
  };

  const toggleAjouterPopup = (workoutId) => {
    setAjouter({ visible: !ajouter.visible, workoutId: workoutId });
  };

  const toggleExerciseSelection = (exercise) => {
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
  };

  const renderExercicesList = () => {
    const categories = Object.keys(ChoixExercices.exercices);
    return (
      <div>
        {categories.map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            <ul>
              {ChoixExercices.exercices[category].map((exercise) => (
                <li key={exercise.id}>
                  {exercise.name}
                  <button onClick={() => toggleExerciseSelection(exercise)}>
                    {exercicesSelectionnes.includes(exercise)
                      ? "Sélectionné"
                      : "Sélectionner"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const handleToggleSettings = (workoutId) => {
    setOpenSettingsId(openSettingsId === workoutId ? null : workoutId);
  };

  return (
    <section>
      <DailyQuest />

      <h2 className="font-titre uppercase">Mes entrainements</h2>
      <div className="grid grid-cols-4 gap-4 ">
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

      {ajouter.visible && (
        <div>
          <div>
            <span className="close" onClick={toggleAjouterPopup}>
              &times;
            </span>
            <h2>Liste des exercices</h2>
            {renderExercicesList()}
            <button onClick={() => handleAddExercise(ajouter.workoutId)}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ListeEntrainements;
