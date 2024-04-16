import { useUser } from '../Context/UserContext';
import { useEffect, useState } from 'react';
import ChoixExercices from '../Data/Exercices.json'; 

const Createworkout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const { createWorkout  } = useUser();
   
    const handleCreateWorkout = () => {
        createWorkout(workoutName, selectedExercises);
        setWorkoutName('');
    }

    const handleToggle = () => {
        setIsClicked(!isClicked);
    }

    const toggleExercise = (exerciseName) => {
        if (selectedExercises.includes(exerciseName)) {
            setSelectedExercises(selectedExercises.filter(exercise => exercise !== exerciseName));
        } else {
            setSelectedExercises([...selectedExercises, exerciseName]);
        }
    }

    return(
        <div>
           <h2 className='font-titre uppercase'>Créer un entrainement</h2>
            <div className='grid grid-cols-3 gap-2'>
            <div>
                <label htmlFor="jambes">
                    Jambes
                </label>
                {ChoixExercices.exercices.jambes.map((exercise) => (
                    <label key={exercise.id} className='flex items-center'>
                        <input
                            type="checkbox"
                            value={exercise.name}
                            checked={selectedExercises.includes(exercise.name)}
                            onChange={() => toggleExercise(exercise.name)}
                        />
                        {exercise.name}
                    </label>
                ))}

            </div>
                <div>
                   <label htmlFor="dos"> Dos</label>
                {ChoixExercices.exercices.dos.map((exercise) => (
                    <label key={exercise.id} className='flex items-center'>
                        <input
                            type="checkbox"
                            value={exercise.name}
                            checked={selectedExercises.includes(exercise.name)}
                            onChange={() => toggleExercise(exercise.name)}
                        />
                        {exercise.name}
                    </label>
                ))}
</div>
<div>
                <label htmlFor="triceps"> Triceps</label>   
                {ChoixExercices.exercices.triceps.map((exercise) => (
                     <label key={exercise.id} className='flex items-center'>
                        <input
                            type="checkbox"
                            value={exercise.name}
                            checked={selectedExercises.includes(exercise.name)}
                            onChange={() => toggleExercise(exercise.name)}
                        />
                        {exercise.name}
                    </label>
                ))}
</div>
<div>
                <label htmlFor="biceps"> Biceps</label>


                {ChoixExercices.exercices.biceps.map((exercise) => (
                     <label key={exercise.id} className='flex items-center'>
                        <input
                            type="checkbox"
                            value={exercise.name}
                            checked={selectedExercises.includes(exercise.name)}
                            onChange={() => toggleExercise(exercise.name)}
                        />
                        {exercise.name}
                    </label>
                ))}
                </div>
                <div>
                <label htmlFor="pec"> Pectoraux</label>

                {ChoixExercices.exercices.pec.map((exercise) => (
                     <label key={exercise.id} className='flex items-center'>
                        <input
                            type="checkbox"
                            value={exercise.name}
                            checked={selectedExercises.includes(exercise.name)}
                            onChange={() => toggleExercise(exercise.name)}
                        />
                        {exercise.name}
                    </label>
                ))}
                </div>
                <div>
                <label htmlFor="epaules"> Épaules</label>

                {ChoixExercices.exercices.epaules.map((exercise) => (
                    <label key={exercise.id} className='flex items-center'>
                        <input
                            type="checkbox"
                            value={exercise.name}
                            checked={selectedExercises.includes(exercise.name)}
                            onChange={() => toggleExercise(exercise.name)}
                        />
                        {exercise.name}
                    </label>
                ))}
                </div>

            </div>

            <input type="text" placeholder="Nom de l'entrainement" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
            <button onClick={handleCreateWorkout}>Créer un entrainement</button>
        </div>
    )
}

export default Createworkout;
