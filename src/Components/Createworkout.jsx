import { useUser } from '../Context/UserContext';
import { useEffect, useState } from 'react';
import ChoixExercices from '../Data/Exercices.json'; 
import { motion, AnimatePresence } from 'framer-motion';

const Createworkout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [selectedExercises, setSelectedExercises] = useState({});
    const [openPopup, setOpenPopup] = useState('');
    const { createWorkout  } = useUser();
   
    const handleCreateWorkout = () => {
        createWorkout(workoutName, Object.values(selectedExercises).flat());
        setWorkoutName('');
    }

    const toggleExercise = (muscleGroup, exerciseName) => {
        const updatedSelectedExercises = {...selectedExercises};
        if (updatedSelectedExercises[muscleGroup]?.includes(exerciseName)) {
            updatedSelectedExercises[muscleGroup] = updatedSelectedExercises[muscleGroup].filter(exercise => exercise !== exerciseName);
        } else {
            updatedSelectedExercises[muscleGroup] = updatedSelectedExercises[muscleGroup] ? [...updatedSelectedExercises[muscleGroup], exerciseName] : [exerciseName];
        }
        setSelectedExercises(updatedSelectedExercises);
    }

    const togglePopup = (muscleGroup) => {
        setOpenPopup(openPopup === muscleGroup ? '' : muscleGroup);
    }

    return(
        <div>
            <h2 className='font-titre uppercase'>Créer un entraînement</h2>

            <div className='grid grid-cols-1'>
                {Object.entries(ChoixExercices.exercices).map(([muscleGroup, exercises]) => (
                    <div key={muscleGroup}>
                        <h3 className="text-xl font-semibold mb-2">{muscleGroup}</h3>
                        <AnimatePresence>
                            {openPopup === muscleGroup && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="popup"
                                >
                                    {exercises.map((exercise) => (
                                        <label key={exercise.id} className='flex items-center'>
                                            {exercise.name}
                                            <input
                                                type="checkbox"
                                                value={exercise.name}
                                                checked={selectedExercises[muscleGroup]?.includes(exercise.name)}
                                                onChange={() => toggleExercise(muscleGroup, exercise.name)}
                                                className="mr-2"
                                            />
                                        </label>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button onClick={() => togglePopup(muscleGroup)} >{openPopup === muscleGroup ? 'Fermer' : 'Voir les exercices'}</button>
                    </div>
                ))}
            </div>

            <input type="text" placeholder="Nom de l'entraînement" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
            <button onClick={handleCreateWorkout}>Créer un entraînement</button>
        </div>
    )
}

export default Createworkout;
