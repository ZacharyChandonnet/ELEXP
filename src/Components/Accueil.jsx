import Heading from "./Heading";
import { motion } from "framer-motion";

const Accueil = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 1.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 1 },
    },
  };

  const style = {
    lineHeight: "6rem",
  };

  const h1 = {
    fontSize: "10rem",
    lineHeight: "7rem",
  };

  return (
    <motion.section
      className="grid grid-cols-1 gap-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Heading title="atteints tes objectifs" />
        <h1 className="text-center font-titre  pt-6" style={h1}>
          TROUVE <br />
          TON POTENTIEL
        </h1>
      </motion.div>

      <motion.div className="bottom" variants={bottomVariants}>
        <figure className="bg-gray-400">
          <h1
            className="text-center font-titre text-9xl pt-12 text-white"
            style={style}
          >
            INTERIEUR <br />
            ET EXTERIEUR
          </h1>
        </figure>
      </motion.div>
    </motion.section>
  );
};

export default Accueil;
