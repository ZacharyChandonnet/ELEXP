import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Profil = () => {
  const {
    afficherExperience,
    ajouterWorkoutFini,
    afficherWokoutDetails,
    afficherWorkoutFini,
    user
  } = useUser();
  const [currentExperience, setCurrentExperience] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [history, setHistory] = useState([]);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const unsubscribe = afficherExperience((experience) => {
      setCurrentExperience(experience);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getWorkouts = async () => {
      const workouts = await afficherWokoutDetails();
      setWorkouts(workouts);
    };
    getWorkouts();
  }, [afficherWokoutDetails]);

  useEffect(() => {
    const getHistory = async () => {
      const history = await afficherWorkoutFini();
      setHistory(history);
    };
    getHistory();
  }, [afficherWorkoutFini]);

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

  return (
    <section>
      <div>
        <h2 className="font-titre uppercase">Profil</h2>
        <p>Expérience: {currentExperience}</p>
        {cooldownRemaining > 0 && (
          <p>Cooldown restant: {formatCooldown(cooldownRemaining)}</p>
        )}

        <div>
          <h3 className="font-titre uppercase">Mes workouts</h3>
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <Link to={`/entrainements`}>{workout.name}</Link>
                <button onClick={() => ajouterWorkoutFini(workout.id)}>
                  Terminé
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-titre uppercase">Historique</h3>
          <ul>
            {history.map((workout) => (
              <li key={workout.id}>
                <Link to={`/entrainements`}>{workout.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
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

export default Profil;
