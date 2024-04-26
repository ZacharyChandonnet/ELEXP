import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";

const ContactDetails = () => {
  const { uuid } = useParams();
  const { afficherContactSelonUuid, afficherWorkoutDetailsContact } = useUser();
  const [contact, setContact] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const initializeWorkouts = async () => {
      try {
        const workouts = await afficherWorkoutDetailsContact(uuid);
        setWorkouts(workouts);
      } catch (error) {
        console.error("Erreur de workouts:", error);
      }
    };

    initializeWorkouts();
  }, [afficherWorkoutDetailsContact, uuid]);

  useEffect(() => {
    const initializeContact = async () => {
      try {
        const contact = await afficherContactSelonUuid(uuid);
        setContact(contact);
      } catch (error) {
        console.error("Erreur de contact:", error);
      }
    };

    initializeContact();
  }, [afficherContactSelonUuid, uuid]);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <h1 className="font-titre text-6xl">{contact?.name}</h1>
        <p className="text-xl font-bold ">exp.{contact?.experience}</p>
      </div>

      <div className="">
        <h2 className="font-titre text-4xl">Statistiques</h2>
        <p>Nombre de workout terminé: {contact?.history.length}</p>
        <p>Nombre de programme terminé: {contact?.entrainementsTendance.length}</p>
        <p>Nombre de défi quotidien terminé{contact?.dailyQuestCompleted.length}</p>
      </div>

      <div>
        <h2 className="font-titre text-4xl">Entrainements</h2>
        {workouts.map((workout) => (
          <div key={workout.id}>
            <h3 className="font-titre text-xl">{workout.name}</h3>
            {workout.exercices.map((exercise, index) => (
              <li key={index} className="flex gap-2 items-center">
                <p>{exercise}</p>
              </li>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
