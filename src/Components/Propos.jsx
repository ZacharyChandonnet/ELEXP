import Heading from "./Heading";
import "./Entrainement.css";
import { motion } from "framer-motion";

const Propos = () => {
  return (
    <div className="relative">
      <Heading
        title="Qui sommes-nous?"
        paragraph="Découvrez notre mission et notre vision."
      />

      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-center pt-12">
          <figure style={{
            maxWidth: "500px"
          }} className="mr-12"
          >
            <img src="/push1_image.webp" alt="Entrainement" />
          </figure>
          <div className="mt-auto ">
            <h2 className="font-titre lg:text-9xl uppercase ">ENTRAINE TOI</h2>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div>
          <h2 className="font-titre lg:text-9xl uppercase text-center ">GAGNE DE L'EXPÉRIENCE</h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >

        <div className="flex justify-center">
          <div className="mb-auto ">
            <h2 className="font-titre lg:text-9xl uppercase "> DÉVELOPPE TOI</h2>
          </div>
          <figure style={{
            maxWidth: "500px"
          }} className="mr-12"
          >
            <img src="/push1_image.webp" alt="Entrainement" />
          </figure>
        </div>

      </motion.div>

    

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <img src="/push2_image.webp" alt="Entrainement" className="absolute bottom-1/2 right-0  transform -translate-x-1/2 -translate-y-1/2 -mb-8" style={{
          width: "22%",
          marginBottom: "2.5%"
        }} />

        <img src="/push2_image.webp" alt="Entrainement" className="absolute top-1/2 left-0  transform -translate-x-1/2 -translate-y-1/2  ml-44" style={{
          width: "25%",
          marginTop: "15%"
        }} />

      </motion.div>

      <div className="text-center font-bold bg-dark text-white my-12 py-12">
        <p className=" italic pt-4 w-2/3 mx-auto">
        " Notre mission est d'offrir un service de qualité à nos clients.
          Nous voulons les aider à atteindre leurs objectifs de remise en
          forme et de bien-être. Nous voulons les aider à se sentir bien
          dans leur peau et à être en bonne santé. "
        </p>

        <p className=" italic pt-4 w-2/3 mx-auto">
        " Notre vision est de motiver nos clients à adopter un mode de vie sain
          en leur proposant un système d'expérience unique sous fourme de jeu.
          En gagnant de l'expérience, les clients pourront débloquer des entraînements et
          des exercices plus avancés afin d'assurer une progression constante. "
        </p>
      </div>

    </div>
  );
};

export default Propos;
