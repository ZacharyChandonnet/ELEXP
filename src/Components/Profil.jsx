import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import TendancesData from "../Data/TendanceData";
import { FaCheck } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import Notification from "./Notification";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import "./Profil.css"
import Heading from "./Heading";


const Profil = () => {
  const {
    afficherExperience,
    ajouterWorkoutFini,
    afficherWokoutDetails,
    afficherWorkoutFini,
    afficherDailyQuestFini,
    afficherDateEntrainementTendance,
    creerObjectif,
    afficherObjectifs,
    deleteObjectif,
    objectifCompleted,
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
  const [ajouterObjectif, setAjouterObjectif] = useState(false);
  const [objectifs, setObjectifs] = useState([]);
  const [notificationAdd, setNotificationAdd] = useState(false);
  const [notificationCompleted, setNotificationCompleted] = useState(false);
  const [notificationDelete, setNotificationDelete] = useState(false);
  const [notificationWorkout, setNotificationWorkout] = useState(false);
  const [currentRank, setCurrentRank] = useState("");
  const [nextRankExp, setNextRankExp] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [nextRank, setNextRank] = useState("");

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
    const getObjectifs = async () => {
      const objectifs = await afficherObjectifs();
      setObjectifs(objectifs);
    };
    getObjectifs();
  }, [afficherObjectifs]);

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

  useEffect(() => {
    const fetchDateEntrainementTendance = async () => {
      const dates = await afficherDateEntrainementTendance();
      setDateEntrainementTendance(dates);
    };
    fetchDateEntrainementTendance();
  }, []);

  useEffect(() => {
    const ranks = {
      Débutant: 0,
      Intermédiaire: 100,
      Avancé: 200,
      Expert: 350,
      Maître: 500,
      Immortel: 1000,
    };

    let rank = "Débutant";
    let nextRank = "";
    for (const [key, value] of Object.entries(ranks)) {
      if (currentExperience >= value) {
        rank = key;
      } else {
        nextRank = key;
        break;
      }
    }
    setCurrentRank(rank);

    const nextRankExp = ranks[nextRank];
    setNextRankExp(nextRankExp);
    setNextRank(nextRank);

    const progressPercent = (currentExperience / nextRankExp) * 100;
    setProgressPercent(progressPercent);
  }, [currentExperience]);



  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  const handleAjouterObjectif = (e) => {
    e.preventDefault();

    const nom = e.target[0].value;
    const description = e.target[1].value;

    if (nom && description) {
      const objectif = {
        titre: nom,
        description: description,
      };
      creerObjectif(objectif);
      setAjouterObjectif(false);

      setNotificationAdd(true);

      setTimeout(() => {
        setNotificationAdd(false);
      }, 7000);
    } else {
      console.error("Problème d'envoie");
    }
  };

  const handleDeleteObjectif = (id) => {
    deleteObjectif(id);

    setNotificationDelete(true);

    setTimeout(() => {
      setNotificationDelete(false);
    }, 7000);
  };

  const handleObjectifCompleted = (id) => {
    objectifCompleted(id);
    const dateCompleted = new Date();

    setNotificationCompleted(true);

    setTimeout(() => {
      setNotificationCompleted(false);
    }, 7000);
  };

  const handleWorkoutCompleted = (id) => {
    if (cooldownRemaining === 0) {
      ajouterWorkoutFini(id);

      setNotificationWorkout(true);

      setTimeout(() => {
        setNotificationWorkout(false);
      }, 7000);
    }
  };

  const { scrollYProgress } = useScroll();

  return (
    <section>
      <Heading title="Profil" paragraph="Bienvenue sur votre profil, ici vous pouvez voir votre progression, vos objectifs et vos workouts terminés." />

      
      <div className="pt-12">

        <h3 className="font-titre uppercase">Mes workouts</h3>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <ul className="pt-2">
            {workouts.map((workout) => (
              <motion.li
                whileHover={{
                  scale: 1.025,
                  backgroundColor: "#0D0D0D",
                  color: "#fff",
                }}

                transition={{ duration: 0.25 }}
              >
                <li key={workout.id} className="border-t-2 border-dark p-2 py-6 flex items-center">
                  <h2 className="uppercase font-titre lg:text-5xl"> <Link to={`/entrainements`}>{workout.name}</Link></h2>
                  <button onClick={() => handleWorkoutCompleted(workout.id)} className="ml-auto lg:text-2xl">
                    <FaCheck />
                  </button>
                </li>
              </motion.li>

            ))}

            {cooldownRemaining > 0 && (
              <p className="text-red-500 font-bold italic text-sm p-2">Temps de repos restant avant d'ajouter un autre entrainement: {formatCooldown(cooldownRemaining)}</p>
            )}
          </ul>

        </motion.div>

      </div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >

        <div className="my-12">
          <div className="flex gap-4 items-center font-titre">
            <p>{currentRank}
              <br />
              exp.{currentExperience}
            </p>
            <div style={{ width: "100%", border: "1px solid black" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              >

                <div
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: "black",
                    height: "1.5rem",
                  }}
                >
                </div>
              </motion.div>
            </div>
            <p>{nextRank}</p>


          </div>
          <p className="text-center font-bold italic">{nextRankExp - currentExperience}XP restants</p>
        </div>
      </motion.div>



      <div>

        <h3 className="font-titre uppercase pt-8 pb-2">Historique</h3>
        <ul className="grid grid-cols-1 gap-4 p-2 bg-dark">
          <div className="p-4">
            <h2 className="font-titre uppercase text-white">Mes workouts terminés</h2>
            {history.map((workout, index) => (
              <li key={index} className="text-white flex border-b-2 border-white p-2 mt-2">
                <Link to={`/entrainements`}>{workout.name}</Link>
                {workout.date && <p className="ml-auto font-bold">{formatDate(workout.date)}</p>}
              </li>
            ))}
          </div>


          <div className="p-4">
            <h2 className="font-titre uppercase text-white">Mes programmes terminés</h2>
            {tendances &&
              tendances.map((tendance, index) => (
                <li className="text-white flex border-b-2 border-white p-2 mt-2" key={tendance.id}>
                  <Link to={`/programmes/${tendance.id}`}>
                    {tendance.title}
                  </Link>

                  {dateEntrainementTendance[index] && (
                    <p className="ml-auto font-bold">{formatDate(dateEntrainementTendance[index])}</p>
                  )}
                </li>
              ))}
          </div>

          <div className="p-4">
            <h2 className="font-titre uppercase text-white">Mon dernier défi du jour</h2>
            {dailyQuestsCompleted &&
              dailyQuestsCompleted.map((dailyQuest) => (
                <li key={dailyQuest.id} className="text-white flex border-b-2 border-white p-2 mt-2">
                  {dailyQuest.name.description} <p className="ml-auto font-bold">{formatDate(dailyQuest.date)}</p>
                </li>
              ))}
          </div>
        </ul>
      </div>

      <div className="mt-28 mb-28 relative text-center">
        <motion.div
          style={{ opacity: scrollYProgress }}
        >
          <figure className="relative z-10">
            <img src="/landing.jpg" alt="landing" className="w-1/2 mx-auto" />
          </figure>
          <h2 className="absolute top-1/2 left-1/2 text-white font-titre text-8xl mt-12 z-50 uppercase transform -translate-x-1/2 -translate-y-1/2">TROUVER TON POTENTIEL</h2>
          <h2 className="absolute top-1/2 left-0 font-titre text-5xl text-dark mt-12 p-4 uppercase">À TOI DE</h2>
          <h2 className="absolute top-1/2 right-0 font-titre text-5xl text-dark mt-12 p-4 uppercase">ET GRANDIR</h2>
        </motion.div>
      </div>


      <div className="text-white bg-dark min-h-96 relative ">
        <div className="text-center pt-8 mt-12">
          <h3 className="font-titre uppercase  lg:text-3xl">Mes objectifs</h3>
          <p className="text-sm lg:text-md"> Garde trace de tes objectifs personnels.</p>
        </div>

        <button
          onClick={() => setAjouterObjectif(!ajouterObjectif)}
          className=" text-lg lg:text-3xl absolute right-0 top-0 p-4 bg-dark text-white z-50 mb-4 mr-4"
        >
          <IoMdAdd />
        </button>

        <div className="grid grid-cols-1 gap-2 p-2  w-11/12 mx-auto">
          {objectifs.map((objectif, index) => (
            <div className=" mt-4 relative border-b-2 border-white p-2" key={index}>
              <h4 className={objectif.isCompleted ? "text-green-500 font-titre" : "font-titre"}>
                {objectif.titre}
              </h4>
              <p className={objectif.isCompleted ? "text-green-500 italic" : "italic"}>
                {objectif.description}
              </p>

              {objectif.isCompleted && (
                <p className="text-green-500"> Date de complétion: {formatDate(objectif.dateCompleted)}</p>
              )}

              <div className="absolute right-0 bottom-0 p-4 flex gap-4">
                {objectif.isCompleted ? (
                  <div>
                    <button
                      className="text-green-500"
                      onClick={() => handleObjectifCompleted(objectif.id)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleObjectifCompleted(objectif.id)}>
                    <FaCheck />
                  </button>
                )}
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteObjectif(objectif.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}


          <div className="flex justify-center items-center mt-4">
            {ajouterObjectif && (
              <AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form onSubmit={handleAjouterObjectif} className="flex flex-col gap-4 formulaire">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <input type="text" placeholder="Titre de l'objectif" className="lg:w-72" />
                      <input type="text" placeholder="Description de l'objectif" className="lg:w-72" />
                    </div>
                    <div className="border-2 border-white p-2 flex justify-center w-1/2 mx-auto">
                      <button type="submit">Ajouter</button>
                    </div>
                  </form>
                </motion.div>

              </AnimatePresence>
            )}
          </div>


        </div>



        {notificationAdd && (
          <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
            <Notification
              message={"Votre objectif a été ajouté avec succès"}
            />
          </div>
        )}

        {notificationDelete && (
          <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
            <Notification
              message={"Votre objectif a été supprimé avec succès"}
            />
          </div>
        )}

        {notificationCompleted && (
          <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
            <Notification
              message={"Votre objectif a été complété avec succès"}
            />
          </div>
        )}

        {notificationWorkout && (
          <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
            <Notification message={"Votre workout a bien été ajouté !"} />
          </div>
        )}
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
