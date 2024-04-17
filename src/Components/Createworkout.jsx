import { useUser } from '../Context/UserContext';
import { useEffect, useState } from 'react';
import ChoixExercices from '../Data/Exercices.json'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowTurnDown } from "react-icons/fa6";

const Createworkout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [selectedExercises, setSelectedExercises] = useState({});
    const [openPopup, setOpenPopup] = useState('');
    const [experience, setExperience] = useState(0);
    const [isAbleToCreate, setIsAbleToCreate] = useState(false);
    const { createWorkout, user  } = useUser();
   
    const handleCreateWorkout = () => {
        createWorkout(workoutName, Object.values(selectedExercises).flat());
        setWorkoutName('');
    }

    useEffect(() => {
        if (user) {
            setExperience(user.experience);
            console.log(user.experience);
        }
    }, [user]);

    useEffect(() => {
        if(experience >= 100) {
            setIsAbleToCreate(true);
        }else{
            setIsAbleToCreate(false);
        }
    }, [experience]);


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
        <div className='pt-12 pb-12'>

            <h2 className='font-titre uppercase pb-4'>Créer un entraînement</h2>
            <div className='grid grid-cols-1 '>
                {Object.entries(ChoixExercices.exercices).map(([muscleGroup, exercises]) => (
                    <div className=' grid grid-cols-1 items-center border-b-2 border-dark pb-2 cursor-pointer pt-4' key={muscleGroup}>
                        <h3 className="text-xl font-semibold">{muscleGroup}</h3>
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
                                        <label key={exercise.id} className='flex items-center '>
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
                        <button className='ml-auto text-2xl pr-12' disabled={!isAbleToCreate} onClick={() => togglePopup(muscleGroup)} >{openPopup === muscleGroup ? <FaArrowTurnDown /> : <FaArrowTurnDown />}</button>
                    </div>
                ))}
            </div>
            <div className='flex justify-center'>
            <input type="text" placeholder="Nom de l'entraînement" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)}  disabled={!isAbleToCreate} />
            <button onClick={handleCreateWorkout} disabled={!isAbleToCreate}>Créer l'entraînement</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 ">
        

        <div >
          <img src="/push1_image.jpg" alt="Entrainement" className="clip"  />
        </div>


        <div className="bg-dark text-white grid grid-cols-1 items-center  p-12 pt-36 pb-36 reverse-clip">
        <div className="lg:pl-16"> 

       
        <h2 className="font-titre text-white text-lg lg:text-3xl uppercase" >
            C'est à toi de te surpasser <br />
            en gagant en expérience.
       
        </h2>

        <p className="text-white italic pt-4 w-2/3 lg:pl-8">
            L'expérience est la clé pour débloquer de nouvelles fonctionnalités et de nouveaux exercices. <br />
          
        </p>
        </div>
        </div>

      </div>


        </div>
    )
}

export default Createworkout;
