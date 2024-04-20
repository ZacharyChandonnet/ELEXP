import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import TendancesData from "../Data/TendanceData";

const Profil = () => {
  const {
    afficherExperience,
    ajouterWorkoutFini,
    afficherWokoutDetails,
    afficherWorkoutFini,
    afficherDailyQuestFini,
    afficherDateEntrainementTendance,
    user,
  } = useUser();
  const [currentExperience, setCurrentExperience] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [history, setHistory] = useState([]);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [convertTime, setConvertTime] = useState(0);
  const [dailyQuestsCompleted, setDailyQuestsCompleted] = useState([]);
  const [tendances, setTendances] = useState([]);
  const [dateEntrainementTendance, setDateEntrainementTendance] = useState([]);

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
    const getDailyQuestsCompleted = async () => {
      const dailyQuestsCompleted = await afficherDailyQuestFini();
      setDailyQuestsCompleted(dailyQuestsCompleted);
    };
    getDailyQuestsCompleted();
  }, [afficherDailyQuestFini]);

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
    if (user && user.entrainementsTendance) {
      const tendances = Object.values(user.entrainementsTendance).map(
        (tendance) => TendancesData.find((t) => t.id === tendance.id)
      );
      setTendances(tendances);
    }
  }, [user]);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  useEffect(() => {
    const fetchDateEntrainementTendance = async () => {
      const dates = await afficherDateEntrainementTendance();
      setDateEntrainementTendance(dates);
    };
    fetchDateEntrainementTendance();
  }, []);

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
            {history.map((workout, index) => (
              <li key={index}>
                <Link to={`/entrainements`}>{workout.name}</Link>
                {workout.date && <span>Date: {formatDate(workout.date)}</span>}
              </li>
            ))}

            {dailyQuestsCompleted &&
              dailyQuestsCompleted.map((dailyQuest) => (
                <li key={dailyQuest.id}>
                  {dailyQuest.name.description} - {formatDate(dailyQuest.date)}
                </li>
              ))}

            {tendances &&
              tendances.map((tendance, index) => (
                <li className="flex" key={index}>
                  <Link to={`/tendances/${tendance.id}`}>{tendance.title}</Link>

                  {dateEntrainementTendance[index] && (
                    <p>{formatDate(dateEntrainementTendance[index])}</p>
                  )}
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
