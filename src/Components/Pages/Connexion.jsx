import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import video from "/video1F.mp4";
import { motion } from "framer-motion";
import "../CSS/Loader.css";

const Connexion = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await login();
      if (result.success) {
        navigate("/");
      } else {
        throw new Error(`Erreur de connexion avec Google : ${result.message}`);
      }
    } catch (error) {
      console.error(`Erreur de connexion avec Google : ${error.message}`);
    }
  };



  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-dark relative">
        <video autoPlay loop muted
          speed="0.5"
          className="h-screen w-full object-cover opacity-50">
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute top-1/2 left-0 transform  -translate-y-1/2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={signInWithGoogle}
            className="bg-white text-dark font-titre text-2xl px-4 py-2  flex items-center gap-2"
          >
            <FcGoogle size={30} />
            <span>Connexion avec Google</span>
          </motion.button>
        </div>

      </div>
      <div>
        <div className="font-titre italic lg:text-6xl uppercase bg-dark text-white righto h-screen flex flex-col justify-center items-center gap-12 relative"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="outline">entraîne toi</motion.h1>
          <motion.h1
            initial={{ opacity: 0,}}
            animate={{ opacity: 1,}}
            transition={{ duration: 1.5, delay: 2 }}
          >gagne en expérience</motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="outline">débloque du contenu</motion.h1>
        </div>

        <figure className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/6 w-1/2 opacity-20 overflow-hidden h-1/2">
          <img src="/LogoB.svg" alt="Logo" className="logo" />
        </figure>

      </div>

    </div>
  );
};

export default Connexion;
