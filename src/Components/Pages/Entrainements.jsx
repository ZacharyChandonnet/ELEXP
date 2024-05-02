import React, { useState } from "react";
import Heading from "../Heading";
import ListeEntrainements from "../ListeEntrainements";
import "../CSS/Entrainement.css";
import { motion } from "framer-motion";

const Entrainements = () => {

  return (
    <section
    >

      <Heading
        title="Booste tes performances en enregistrant tes entraînements "
        paragraph="Ajoute tes entraînements afin de suivre ta progression et de te motiver à atteindre tes objectifs."
      />


      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 lg:grid-cols-2 pt-12 pageBlur">
        <div className="bg-dark text-white grid grid-cols-1 items-center p-6 pt-16 pb-16  lg:p-12 lg:pt-36 lg:pb-36 reverse-clip order-2 lg:order-1">
          <div className="lg:pl-16">
            <h2 className="font-titre text-white text-lg lg:text-3xl">
              CRÉEZ ET PERSONNALISE <br />
              TES ENTRAINEMENTS QUAND TU VEUX.
            </h2>

            <p className="text-white lg:ml-6 italic pt-4 lg:w-2/3 lg:pl-8">
              Créez tes propres entraînements avec des exercices optimales au
              développement de vos performances <br /> et au goût du jour.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-1">
          <img src="/push1_image.webp" alt="Entrainement" className="clip" />
        </div>
      </motion.div>


      <ListeEntrainements />

      <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 pageBlur">
        <div >
          <img src="/legs3_image.webp" alt="Entrainement" className="clip" />
        </div>

        <div className="bg-dark text-white grid grid-cols-1 items-center p-6 pt-16 pb-16  lg:p-12 lg:pt-36 lg:pb-36 reverse-clip">
          <div className="lg:pl-20 ">
            <h2 className="font-titre text-white text-lg lg:text-3xl uppercase">
              C'est à toi de te surpasser <br />
              en gagant en expérience.
            </h2>

            <p className="text-white lg:ml-4 italic pt-4 w-2/3 lg:pl-8">
              L'expérience est la clé pour débloquer de nouvelles
              fonctionnalités et de nouveaux exercices. <br />
            </p>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Entrainements;
