import { useUser } from '../Context/UserContext';
import { useEffect, useState } from 'react';
import ChoixExercices from '../Data/Exercices.json'; 

const Createworkout = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);

    const { createWorkout } = useUser();
   
    const handleCreateWorkout = () => {
        createWorkout(workoutName, selectedExercises);
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
            <h1>Créer un entrainement</h1>
            <div className='flex'>
            <div>
                {ChoixExercices.exercices.jambes.map((exercise) => (
                    <label key={exercise.id}>
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
                {ChoixExercices.exercices.dos.map((exercise) => (
                    <label key={exercise.id}>
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
                {ChoixExercices.exercices.triceps.map((exercise) => (
                    <label key={exercise.id}>
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


                {ChoixExercices.exercices.biceps.map((exercise) => (
                    <label key={exercise.id}>
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


                {ChoixExercices.exercices.pec.map((exercise) => (
                    <label key={exercise.id}>
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

                {ChoixExercices.exercices.epaules.map((exercise) => (
                    <label key={exercise.id}>
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
