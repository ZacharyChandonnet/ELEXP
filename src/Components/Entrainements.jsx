import React, { useState } from "react";
import Heading from "./Heading";
import ListeEntrainements from "./ListeEntrainements";
import "./CSS/Entrainement.css";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const Entrainements = () => {
  const [showWorkouts, setShowWorkouts] = useState(false);
  const [showX2, setShowX2] = useState(false);
  const { scrollYProgress } = useScroll();
  const handleX2AnimationComplete = () => {
    setShowWorkouts(true);
  };

  const handleX2Return = () => {
    setShowWorkouts(false);
  };



  return (
    <section>
      <Heading
        title="Booste tes performances en enregistrant tes entraînements "
        paragraph="Ajoute tes entraînements afin de suivre ta progression et de te motiver à atteindre tes objectifs."
      />

      <motion.div
        className="X-1"
        initial={{ opacity: 0, y: "-100vh" }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        onAnimationComplete={() => setShowX2(true)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 ">
          <div className="bg-dark text-white grid grid-cols-1 items-center  p-12 pt-36 pb-36 reverse-clip">
            <div className="lg:pl-16">
              <h2 className="font-titre text-white text-lg lg:text-3xl">
                CRÉEZ ET PERSONNALISE <br />
                TES ENTRAINEMENTS QUAND TU VEUX.
              </h2>

              <p className="text-white italic pt-4 w-2/3 lg:pl-8">
                Créez tes propres entraînements avec des exercices optimales au
                développement de vos performances <br /> et au goût du jour.
              </p>
            </div>
          </div>

          <div>
            <img src="/push1_image.webp" alt="Entrainement" className="clip" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showWorkouts && (
          <motion.div
            className="Workouts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0, duration: 1 } }}
          >
            <ListeEntrainements />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showX2 && (
          <motion.div
            className="X-2"
            initial={{ opacity: 0, y: "-200" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
            exit={{ opacity: 0, y: "-200", transition: { duration: 1, ease: "easeInOut" } }}
            onAnimationComplete={handleX2AnimationComplete}
            onExitComplete={handleX2Return}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 ">
              <div>
                <img src="/legs3_image.webp" alt="Entrainement" className="clip" />
              </div>

              <div className="bg-dark text-white grid grid-cols-1 items-center  p-12 pt-36 pb-36 reverse-clip">
                <div className="lg:pl-16">
                  <h2 className="font-titre text-white text-lg lg:text-3xl uppercase">
                    C'est à toi de te surpasser <br />
                    en gagant en expérience.
                  </h2>

                  <p className="text-white italic pt-4 w-2/3 lg:pl-8">
                    L'expérience est la clé pour débloquer de nouvelles
                    fonctionnalités et de nouveaux exercices. <br />
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Entrainements;
