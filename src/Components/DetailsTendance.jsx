import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TendanceData from '../Data/TendanceData';
import Heading from './Heading';
import { useUser } from "../Context/UserContext";

const DetailsTendance = () => {
    const { id } = useParams();
    const tendance = TendanceData[id - 1];
    const [cooldownRemaining, setCooldownRemaining] = useState(0);
    const { ajouterExperience, user, partirTimer } = useUser();

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

    const addWorkout = () => {
      if (cooldownRemaining === 0) {
        ajouterExperience(10);
        partirTimer();
      } else {
        console.log('Vous devez attendre avant de pouvoir ajouter un autre workout');
      }
    }

    return (
        <div className='relative'>
            <Heading title={tendance.title} paragraph={tendance.description} />
            <button onClick = {addWorkout}>Ajouter un workout</button>
            <p>Temps de récupération : {formatCooldown(cooldownRemaining)}</p>
            <div>
              {tendance.workouts.map((detail, index) => (
                <div key={index} className="detail">
                  <h3>{detail.name}</h3>
                  <p>{detail.sets}</p>
                  <p>{detail.reps}</p>
                  <img src={`/${detail.image}`} alt={detail.name} />

                </div>
              ))}
            </div>

            <Link to="/tendances" className='absolute top-0 left-0 p-4'>Retour</Link>

        </div>
    );
}

const formatCooldown = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};


export default DetailsTendance;