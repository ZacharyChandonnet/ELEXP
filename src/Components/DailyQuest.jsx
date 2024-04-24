import { useUser } from "../Context/UserContext";
import { useState, useEffect } from "react";
import Notification from "./Notification";
import { FaCheck } from "react-icons/fa";

const DailyQuest = () => {
  const { creerDailyQuest, user, afficherDailyQuest, ajouterDailyQuestFini } =
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
    <section className="pt-12 pb-12">
      <h2 className="font-titre uppercase pb-4">Défi du jour</h2>
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
                <div className="flex items-center gap-2">
                  <p
                    className={
                      user.userCompletedDailyQuest ? "text-dark" : "text-white"
                    }
                  >
                    - {dailyQuest?.name?.description}
                  </p>


                  {!user.userCompletedDailyQuest && (
                    <button
                      className={
                        user.userCompletedDailyQuest ? "text-dark" : "text-white"
                      }
                      onClick={ajouterDaily}
                    >
                      <p className="p-2">
                        <FaCheck />
                      </p>
                    </button>
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

                <p className="text-white italic text-sm  opacity-50"

                >
                  *Tu as le droit à {user.reroll} re-roll par jour (refresh la
                  page)
                </p>
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

      {notification && (
        <div className="fixed bottom-0 right-0 p-4 bg-dark text-white z-50 mb-4 mr-4">
          <Notification
            message={
              "Votre défi du jour a bien été terminé !" +
              dailyQuest?.name?.experience +
              " points d'expérience"
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
