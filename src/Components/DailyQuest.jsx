import { useUser } from "../Context/UserContext";
import { useState, useEffect } from "react";

const DailyQuest = () => {

    const { creerDailyQuest, user, afficherDailyQuest, ajouterDailyQuestFini } = useUser();
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const [dailyQuest, setDailyQuest] = useState(null);

    useEffect(() => {
        creerDailyQuest();

    }, []);

    useEffect(() => {
        const getDailyQuest = async () => {
            const dq = await afficherDailyQuest();
            setDailyQuest(dq);
            console.log(dq);
        };
        getDailyQuest();
        console.log(dailyQuest);
    }
        ,
        []);


    const ajouterDaily = () => {
        if(user.userCompletedDailyQuest === false)
        {
        ajouterDailyQuestFini();
        }else{
            console.log('Vous avez déjà terminé votre défi du jour');
        }
    }

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
            <h2 className='font-titre uppercase'>Défi du jour</h2>
            <div>
                <div>
                    <div>
                        <div 
                         className={`bg-gray-200 p-4 rounded-lg ${!user.userCompletedDailyQuest ? 'bg-green-500' : 'bg-red-500'}`}>
                            <p>Titre : {dailyQuest?.name?.title}</p>
                            <p>Description : {dailyQuest?.name?.description}</p>
                            <p>Expérience : {dailyQuest?.name?.experience}</p>


                            {!user.userCompletedDailyQuest && (
                            <button onClick={ajouterDaily}>Terminer</button>
                            )}
                    {cooldownRemaining > 0 && (
                        <p>Cooldown restant: {formatCooldown(cooldownRemaining)}</p>
                    )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const formatCooldown = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };


export default DailyQuest;