import React, { useEffect, useState } from 'react';
import { useUser } from '../Context/UserContext';
import Createworkout from './Createworkout';

const ListeEntrainements = () => {
    const { afficherWokoutDetails } = useUser();
    const [workouts, setWorkouts] = useState([]);
    

    useEffect(() => {
        const getWorkouts = async () => {
            const workouts = await afficherWokoutDetails();
            setWorkouts(workouts);
        };

        getWorkouts();
    }, [afficherWokoutDetails]);

    return (
        <section>
            <h2 className='font-titre uppercase'>Mes Entrainements</h2>
            <Createworkout />
            <div>
                {workouts && workouts.length === 0 ? (
                    <p>Vous n'avez pas encore d'entrainements</p>
                ) : (
                    workouts.map((workout) => (
                        <p key={workout.id}>{workout.name}

                               
                                {workout.exercices.map((exercise, index) => (
                                    <li key={index}>{exercise}</li>
                                ))}
                           
                        </p>
                    ))
                    
                )}
            </div>
        </section>
    );
};

export default ListeEntrainements;
