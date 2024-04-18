import Heading from "./Heading";
import "./Entrainement.css";
import { motion } from "framer-motion";

const Propos = () => {
  return (
    <div>
      <Heading
        title="Qui sommes-nous?"
        paragraph="Découvrez notre mission et notre vision."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 ">
        <div className="bg-dark text-white grid grid-cols-1 items-center  p-12 pt-36 pb-36">
          <div className="lg:pl-16">
            <h2 className="font-titre text-white text-lg lg:text-3xl">
              Notre mission
            </h2>

            <p className="text-white italic pt-4 w-2/3 ">
              Notre mission est d'offrir un service de qualité à nos clients.
              Nous voulons les aider à atteindre leurs objectifs de remise en
              forme et de bien-être. Nous voulons les aider à se sentir bien
              dans leur peau et à être en bonne santé.
            </p>
          </div>
        </div>

        <motion.div
          className="two"
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/push1_image.jpg" alt="Entrainement" className="para" />
        </motion.div>

      </div>

      <div>
        <h2 className="">
          Notre vision
        </h2>

        <p className="">
          Notre vision est de motiver nos clients à adopter un mode de vie sain
          en leur proposant un système d'expérience unique sous fourme de jeu.
          En gagnant de l'expérience, les clients pourront débloquer des entraînements et
          des exercices plus avancés afin d'assurer une progression constante.
        </p>
      </div>

    </div>
  );
};

export default Propos;
