import React, { useEffect, useState } from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Profil = () => {
    const { afficherExperience, ajouterWorkoutFini, afficherWokoutDetails, afficherWorkoutFini } = useUser();
    const [currentExperience, setCurrentExperience] = useState(0);
    const [workouts, setWorkouts] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const unsubscribe = afficherExperience(experience => {
            setCurrentExperience(experience);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const getWorkouts = async () => {
            const workouts = await afficherWokoutDetails();
            setWorkouts(workouts);
        };
        console.log(workouts);

        getWorkouts();
    }, [afficherWokoutDetails]);

    useEffect(() => {
        const getHistory = async () => {
            const history = await afficherWorkoutFini();
            setHistory(history);
        };
        console.log(history);

        getHistory();
    }, [afficherWorkoutFini]);


   

    return (
        <section>
            <div>
                <h2 className="font-titre uppercase">Profil</h2>
                <p>Expérience: {currentExperience}</p>


                <div>
                    <h3 className="font-titre uppercase">Mes workouts</h3>
                    <ul>
                    {workouts.map(workout => (
                        <li key={workout.id}>
                         <Link to={`/entrainements`}>{workout.name}</Link>
                            <button onClick={() => ajouterWorkoutFini(workout.id)}>Terminé</button> 
                        </li>
                    ))}

                    </ul>
                </div>

                <div>
                    <h3 className="font-titre uppercase">Historique</h3>
                    <ul>
                        {history.map(workout => (
                            <li key={workout.id}>
                                 <Link to={`/entrainements`}>{workout.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Profil;
