import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { motion } from "framer-motion";
import BarrerExperience from "./BarreExperience";

const ContactDetails = () => {
  const { uuid } = useParams();
  const { afficherContactSelonUuid, afficherWorkoutDetailsContact } = useUser();
  const [contact, setContact] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [currentRank, setCurrentRank] = useState("");
  const [nextRank, setNextRank] = useState("");
  const [nextRankExp, setNextRankExp] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);


  useEffect(() => {
    setCurrentExperience(contact?.experience);
  }, [contact]);


  useEffect(() => {
    const ranks = {
      Débutant: 0,
      Intermédiaire: 100,
      Avancé: 200,
      Expert: 350,
      Maître: 500,
      Immortel: 1000,
    };

    let rank = "Débutant";
    let nextRank = "";
    for (const [key, value] of Object.entries(ranks)) {
      if (currentExperience >= value) {
        rank = key;
      } else {
        nextRank = key;
        break;
      }
    }
    setCurrentRank(rank);

    const nextRankExp = ranks[nextRank];
    setNextRankExp(nextRankExp);
    setNextRank(nextRank);

    const progressPercent = (currentExperience / nextRankExp) * 100;
    setProgressPercent(progressPercent);
  }, [currentExperience]);

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
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="displayLanding pt-24">
          <div className="">
            <div className="flex items-center  gap-2">
              <h2 className="font-titre uppercase text-3xl lg:text-5xl">
                {contact?.name}
              </h2>
              <p className="font-bold ">
                exp.{contact?.experience} <br />

              </p>
            </div>
            <p className="italic">
              Bienvenue sur le profil de {contact?.name}
            </p>
          </div>

          <figure className="">
            <img
              src="/push1_image.webp"
              alt="landing"
              className="paraProfil w-3/4 mx-auto"
            />
          </figure>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <BarrerExperience currentRank={currentRank} nextRank={nextRank} nextRankExp={nextRankExp} progressPercent={progressPercent} currentExperience={currentExperience} />

      </motion.div>

      <h2 className="font-titre uppercase py-4">Statistiques</h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-dark text-white py-8 px-4">
        <div className="flex border-b-2 border-white py-4 px-2">
          <p>Entraînements terminés: </p>
          <p className="ml-auto font-bold font-lg">{contact?.history.length}</p>
        </div>
        <div className="flex border-b-2 border-white py-4 px-2">
          <p>Programmes terminés: </p>
          <p className="ml-auto font-bold font-lg">{contact?.entrainementsTendance.length}</p>
        </div>
        <div className="flex border-b-2 border-white py-4 px-2">
          <p>Défis quotidiens terminés :</p>
          <p className="ml-auto font-bold font-lg"> {contact?.dailyQuestCompleted.length}</p>
        </div>
      </motion.div>

      <div className="py-12">
        <h2 className="font-titre text-4xl">Entraînements</h2>

        {workouts.length === 0 && (
          <p className="italic"> {contact?.name} n'a aucun entraînement pour le moment.</p>
        )	  
        }

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {workouts.map((workout, index) => (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.25 }}
              className="bg-dark text-white py-4 px-4 my-4"
              key={index}>
              <h3 className="font-titre text-xl">{workout.name}</h3>
              {workout.exercices.map((exercise, index) => (
                <li key={index} className="flex gap-2 items-center">
                  <p>{exercise}</p>
                </li>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
