import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import Createworkout from "./Createworkout";
import DailyQuest from "./DailyQuest";
import ChoixExercices from "../Data/Exercices.json";

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

  return (
    <section>
      <DailyQuest />

      <div className="grid grid-cols-1 gap-4">
        <h2 className="font-titre uppercase">Mes entrainements</h2>
        {workouts && workouts.length === 0 ? (
          <p>Vous n'avez pas encore d'entrainements</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="bg-red-500 relative">
              <p>{workout.name}</p>
              <ul>
                {workout.exercices.map((exercise, index) => (
                  <li key={index}>
                    {exercise}
                    {modifier && (
                      <button
                        onClick={() =>
                          handleDeleteExercice(workout.id, exercise)
                        }
                      >
                        Supprimer
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleDeleteWorkout(workout.id)}>
                Supprimer
              </button>
              <button onClick={() => setModifier(!modifier)}>Modifier</button>

              <div className="absolute top-0 right-0">
                {modifier && (
                  <button onClick={() => toggleAjouterPopup(workout.id)}>Ajouter des exercices</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <Createworkout />

      {ajouter.visible && (
        <div className="popup">
          <div className="popup-content">
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
