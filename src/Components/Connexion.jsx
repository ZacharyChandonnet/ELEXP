import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import video from "../assets/video.mp4"; 
import {motion} from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.5, duration: 1.5 },
    },
  };

  return (

    <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >

    <div className="flex items-center" style={{ position: "relative", overflow: "hidden", height: "100vh"}}>
      <div
        className="grid grid-cols-2 gap-12 bg-black h-64 items-center p-4 lg:w-2/3 relative z-10 rounded-xl"
        style={{ position: "relative" }}
      >
        <h1 className="font-titre lg:text-4xl text-white z-10 relative">Veuillez vous connecter <br/> afin d'accéder à nos services</h1>
        <button onClick={signInWithGoogle} className="z-10 relative"> <span className="text-5xl"><FcGoogle /></span> </button>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, height: "80%", width: "100%", zIndex: 1, marginTop: "5%"}}>
        <video autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}>
          <source src={video} type="video/mp4" /> 
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </motion.section>
  );
};

export default Connexion;
