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


    return (
        <section className="pt-12 pb-12">
            <h2 className='font-titre uppercase'>Défi du jour</h2>
            <div>
                <div>
                    <div>
                        <div 
                         className={`bg-gray-200 p-4 rounded-lg ${user.userCompletedDailyQuest ? 'bg-green-500' : 'bg-red-500'}`}>
                            <p>Titre : {dailyQuest?.name?.title}</p>
                            <p>Description : {dailyQuest?.name?.description}</p>
                            <p>Expérience : {dailyQuest?.name?.experience}</p>
                            <button onClick={ajouterDaily}>Terminer</button>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    )
}


export default DailyQuest;