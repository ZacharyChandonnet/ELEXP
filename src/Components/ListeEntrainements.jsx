import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import Createworkout from "./Createworkout";
import DailyQuest from "./DailyQuest";

const ListeEntrainements = () => {
  const { afficherWokoutDetails, supprimerEntrainement } = useUser();
  const [workouts, setWorkouts] = useState([]);

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

  return (
    <section>

    <DailyQuest />

      <div>
        <h2 className="font-titre uppercase">Mes entrainements</h2>
        {workouts && workouts.length === 0 ? (
          <p>Vous n'avez pas encore d'entrainements</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id}>
              <p>{workout.name}</p>
              <ul>
                {workout.exercices.map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
              <button onClick={() => handleDeleteWorkout(workout.id)}>
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>
     

      <Createworkout />

      
     
    </section>
  );
};

export default ListeEntrainements;
