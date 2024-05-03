import Heading from "../Heading";
import "../CSS/Entrainement.css";
import { motion } from "framer-motion";
import { LiaEye } from "react-icons/lia";
import { GiBiceps } from "react-icons/gi";
import { LuDumbbell } from "react-icons/lu";
import { GiPodiumWinner } from "react-icons/gi";
import "../CSS/Propos.css";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const Propos = () => {

  const {setContact, contact} = useUser();

  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 20,
        },
      },
    },
  };

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
        <div className="lg:flex justify-center ">
          <figure
            style={{
              maxWidth: "500px",
            }}
            className="mr-12 hidden md:block"
          >
            <img src="/push1_image.webp" alt="Entrainement" />
          </figure>
          <div className="mt-auto ">
            <h2 className="font-titre text-2xl lg:text-9xl uppercase ">ENTRAINE <span className="lg:text-white">TOI</span></h2>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div>
          <h2 className="font-titre text-2xl lg:text-9xl uppercase lg:text-center  ">
            GAGNE DE L'EXPÉR<span className="lg:text-white">IENCE</span>
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="lg:flex justify-center">
          <div className="mb-auto ">
            <h2 className="font-titre text-2xl lg:text-9xl uppercase">
              {" "}
              <span className="lg:text-white">DÉV</span>ELOPPE TOI
            </h2>
          </div>
          <figure
            style={{
              maxWidth: "500px",
            }}
            className="mr-12"
          >
            <img src="/legs1_image.webp" alt="Entrainement" className="ml-12" />
          </figure>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, zIndex: -10 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <img
          src="/pull3_image.webp"
          alt="Entrainement"
          className="absolute bottom-1/2 right-0  transform -translate-x-1/2 -translate-y-1/2 -mb-8 -z-10 hidden md:block"
          style={{
            width: "28%",
            marginBottom: "24%",
            filter: "blur(2.5px)",
            marginRight: "-17%",
          }}
        />

        <img
          src="/push2_image.webp"
          alt="Entrainement"
          className="absolute top-1/2 left-0  transform -translate-x-1/2 -translate-y-1/2  ml-44 -z-10 hidden md:block"
          style={{
            width: "25%",
            marginTop: "-25%",
            filter: "blur(5.5px)",
            marginLeft: "8%",
          }}
        />
      </motion.div>

      <div className="grid grid-cols-1 font-bold my-12 py-12">
        <motion.div
          whileHover={{
            color: "white",
            backgroundColor: "black",
            scale: 1.05,
            transition: { duration: 0.25 },

          }}
          className="right border-t-2 border-dark py-6">
          <div>
            <GiBiceps className="mx-auto " />
          </div>
          <div className="p-8">
            <p className=" italic pt-4 w-2/3 mx-auto">
              " Notre mission est d'offrir un service de qualité à nos utilisateurs. Nous
              voulons les aider à atteindre leurs objectifs de remise en forme et de
              bien-être. Nous voulons les aider à se sentir bien dans leur peau et à
              être en bonne santé. "
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            color: "white",
            backgroundColor: "black",
            scale: 1.05,
            transition: { duration: 0.25 },

          }}
          className="left pt-6 border-t-2 border-dark">
          <div>
            <LiaEye className="mx-auto " />
          </div>

          <div className="p-8">
            <p className=" italic pt-4 w-2/3 mx-auto">
              " Notre vision est de motiver nos utilisateurs à adopter un mode de vie
              sain en leur proposant un système d'expérience unique sous fourme de
              jeu. En gagnant de l'expérience, les utilisateurs pourront débloquer des
              entraînements et des exercices plus avancés afin d'assurer une
              progression constante. "
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            color: "white",
            backgroundColor: "black",
            scale: 1.05,
            transition: { duration: 0.25 },

          }}
          className="right pt-6 border-t-2 border-dark">
          <div>
            <LuDumbbell className="mx-auto " />
          </div>
          <div className="p-8 ">
            <p className=" italic pt-4 w-2/3 mx-auto">
              " Ce que nous offrons à nos utilisateurs, c'est des <a href="/programmes"><span className="text-green-500 cursor-pointer">programmes d'entraînement</span></a>  selon les tendances d'aujourd'hui, des défis quotidiens
              afin de les motiver à se dépasser, la possibilité de <a href="/entrainements"><span className="text-green-500 cursor-pointer"> créér ses entraînements personnalisés</span></a> , un <a href="/profil"><span className="text-green-500 cursor-pointer">historique</span></a>  de ses performances et un <a href="/profil"><span className="text-green-500 cursor-pointer">tableau
              de bord</span></a>  pour suivre ses objectifs. Toujours incertain? Consulte notre <a href="/faq"><span className="text-green-500 cursor-pointer">FAQ</span></a> pour plus d'informations afin de t'aider à te donner une meilleure idée des possibilités qui s'offrent à toi."
            </p>
          </div>

        </motion.div>

        <motion.div
          whileHover={{
            color: "white",
            backgroundColor: "black",
            scale: 1.05,
            transition: { duration: 0.25 },

          }}
          className="left pt-6 border-t-2 border-dark">
          <div>
            <GiPodiumWinner className="mx-auto " />
          </div>
          <div className="p-8 ">
            <p className=" italic pt-4 w-2/3 mx-auto">
              " Envie de te dépasser et de t'améliorer? Consulte notre système de <span className="cursor-pointer text-green-500"  onClick={() => setContact(!contact)}>classement</span> pour voir où que tu te situes par rapport aux autres utilisateurs.
              Tu pourras aussi ajouter des contacts pour suivre leur progression et discuter avec eux afin de demander des conseils ou de les motiver."
            </p>
          </div>

        </motion.div>

      </div>

      <div className="py-24  bg-dark grid grid-cols-1 justify-center items-center gap-6 relative marquee"
      >
        <motion.h2
          variants={marqueeVariants}
          animate="animate"
          className=" text-white uppercase font-titre lg:text-5xl text-center track">
          prêt à atteindre tes objectifs? ⠀⠀ prêt à atteindre tes objectifs? ⠀ ⠀prêt à atteindre tes objectifs? ⠀⠀ prêt à atteindre tes objectifs? ⠀ ⠀prêt à atteindre tes objectifs?
        </motion.h2>
      </div>
      <div className="bg-dark text-white text-center pb-12">
        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.15 },
            backgroundColor: "#0D0D0D",
            color: "white",
            border: "2px solid white",
          }}
          className="bg-white text-dark w-1/2 lg:w-1/6 mx-auto py-2 px-4 font-titre">
          <a href="/entrainements">
            Commencer maintenant
          </a>
        </motion.button>
      </div>
    </div>
  );
};

export default Propos;
