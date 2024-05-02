import { useUser } from "../Context/UserContext";
import { useState, useEffect } from "react";
import Notification from "./Notification";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const DailyQuest = () => {
  const { creerDailyQuest, user, afficherDailyQuest, ajouterDailyQuestFini, setRerolltoTrue, setRerolltoFalse } =
    useUser();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [dailyQuest, setDailyQuest] = useState(null);
  const [notification, setNotification] = useState(false);



  useEffect(() => {
    if (user) {
      const currentTime = new Date().getTime();
      const lastWorkoutTime = user.lastDailyQuestTime;
      const cooldownTime = 24 * 60 * 60 * 1000;
      const remainingTime = cooldownTime - (currentTime - lastWorkoutTime);
      if (remainingTime <= 0) {
        creerDailyQuest();
        const setReroll = async () => {
          if (!user.reroll || user.reroll) {
            setRerolltoFalse();
          }
        };
        setReroll();
      }
    }
  }, [user]);



  useEffect(() => {
    const getDailyQuest = async () => {
      const dq = await afficherDailyQuest();
      setDailyQuest(dq);
      console.log(dq);
    };
    getDailyQuest();
    console.log(dailyQuest);
  }, []);

  const ajouterDaily = () => {
    if (user.userCompletedDailyQuest === false) {
      ajouterDailyQuestFini();

      setNotification(true);

      setTimeout(() => {
        setNotification(false);
      }, 7000);
    } else {
      console.log("Vous avez déjà terminé votre défi du jour");
    }
  };

  const setReroll = async () => {
    if (!user.reroll) {
      setRerolltoTrue();
      const dq = await afficherDailyQuest();
      setDailyQuest(dq);
    }
  };

  useEffect(() => {
    if (user && user.lastDailyQuestTime) {
      const currentTime = new Date().getTime();
      const lastWorkoutTime = user.lastDailyQuestTime;
      const cooldownTime = 24 * 60 * 60 * 1000;
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
    <section className="pt-12 pb-12 pageBlur">

      {user && !user.reroll && (
        
        <motion.button 
        whileHover={{ scale: 1.05, backgroundColor: "white", color: "black", border: "2px solid black" }}
        transition={{ duration: 0.25 }}

        className="bg-dark text-white p-2 w-full flex justify-center items-center mx-auto" onClick={setReroll}>
          <p className="font-titre uppercase p-4">
            Générer le défi du jour
          </p>
        </motion.button>
      )}


      {user && user.reroll && (<h2 className="font-titre uppercase pb-4">Défi du jour</h2>)}
      {user && user.reroll && (
        <div>
          <div>
            <div>
              <div
                className={`p-4  ${!user.userCompletedDailyQuest ? "bg-dark" : "bg-gray-300"
                  }`}

                style={{ position: "relative" }}
              >
                <p
                  className={`text-lg font-bold font-titre py-2  ${user.userCompletedDailyQuest ? "texr-dark" : "text-white"
                    }`}
                >
                  {dailyQuest?.name?.title}
                </p>
                <div className="pl-2  flex flex-col gap-2">
                  <div className="flex flex-col  gap-2">
                    <p
                      className={
                        user.userCompletedDailyQuest ? "text-dark" : "text-white"
                      }
                    >
                      - {dailyQuest?.name?.description}
                    </p>


                    {!user.userCompletedDailyQuest && (
                      <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "white", color: "black"}}
                      transition={{ duration: 0.25 }}
                        className={
                          user.userCompletedDailyQuest ? "text-dark" : "text-white border-2 border-white w-28"
                        }
                        onClick={ajouterDaily}
                      >
                        <div className="p-2 text-xl flex items-center gap-2">
                          <p className="text-sm">Terminer</p>
                          <FaCheck />
                        </div>
                      </motion.button>
                    )}

                  </div>





                  {cooldownRemaining > 0 && (
                    <p
                      className={
                        user.userCompletedDailyQuest ? "text-dark italic text-sm" : "text-red-500 italic text-sm"
                      }
                    >
                      Temps restant avant le prochain défi :{" "}
                      {formatCooldown(cooldownRemaining)}
                    </p>
                  )}

                  <p
                    className={
                      user.userCompletedDailyQuest ? "hidden" : "text-green-500 p-6 text-sm italic "
                    }

                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                    }}
                  >
                    Récompense de {dailyQuest?.name?.experience} exp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}



      {notification && (
        <div className="fixed top-0 right-0 p-4 bg-dark text-white z-50 mt-10 mr-4 w-1/5">
          <Notification
            message={
              "Ton défi du jour a bien été terminé !" +
              dailyQuest?.name?.experience +
              "exp"
            }
            redirection="/profil"
          />
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

export default DailyQuest;
