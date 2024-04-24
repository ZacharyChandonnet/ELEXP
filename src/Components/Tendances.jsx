import { Link } from "react-router-dom";
import TendanceData from "../Data/TendanceData";
import Heading from "./Heading";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { motion } from "framer-motion";
import video1F from "/video3F.mp4";
import video2F from "/video2F.mp4";
import video3F from "/video1F.mp4";

const Tendances = () => {
  const { user, ajouterExperience } = useUser();
  const [isAbleToAccess, setIsAbleToAccess] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (user && user.experience >= 30) {
      setIsAbleToAccess(true);
    } else {
      setIsAbleToAccess(false);
    }
  }, [user]);

  const tendanceThresholds = [30, 80, 120];

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.pause();
      video.currentTime = 7;
      video.addEventListener("mouseenter", () => {
        const requiredExperience = tendanceThresholds[0] || 0;
        if (user && user.experience >= requiredExperience) {
          video.play();
        }
      });
      video.addEventListener("mouseleave", () => {
        video.pause();
      });
    });
  }, [user]);

  const renderTendanceItem = (tendance, index) => {
    const requiredExperience = tendanceThresholds[index] || 0;
    const videos = [video1F, video2F, video3F];

    return (
      <motion.div
        key={tendance.id}
        className="tendance-item mb-4"
        whileHover={{ scale: 1.075, transition: { duration: 0.25 } }}
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 0.1 * index },
        }}
      >
        <Link
          to={
            user && user.experience >= requiredExperience
              ? `/programmes/${tendance.id}`
              : "/programmes"
          }
          style={{ textDecoration: "none" }}
        >
          <div
            className={`pt-12 bg-dark text-white  px-4 ${
              !isAbleToAccess || (user && user.experience < requiredExperience)
                ? "opacity-50"
                : "opacity-100"
            }`}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {user && user.experience < requiredExperience && (
              <div className="experience-indicator absolute top-0 right-0 mt-2 mr-2 text-md text-bold text-red-500 uppercase">
                Experience minimale requise: {requiredExperience}
              </div>
            )}
            <video
              className="w-full h-full object-cover absolute bottom-0 left-0 z-0 opacity-25"
              autoPlay
              loop
              muted
              playsInline
              src={videos[index]}
            ></video>
            <div className="flex flex-col-reverse justify-between h-60 pb-6">
              <div className="flex justify-between items-end">
                <h5 className="uppercase font-titre text-4xl z-10 relative">
                  {tendance.title}
                </h5>
                <div className="btn btn-primary text-4xl z-10 relative">
                  <FaArrowRightLong />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div>
      <Heading
        title="Le fitness devrait être accessible à tout le monde."
        paragraph="Découvrez les tendances du moment pour vous aider à rester en forme."
      />
      <h2 className="font-titre uppercase pt-12 pb-4">
        Programmes tendances
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="lg:col-span-2 flex">
          {TendanceData.slice(0, 2).map((tendance, index) => (
            <div key={tendance.id} className="w-1/2 pr-4">
              {renderTendanceItem(tendance, index)}
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {TendanceData.slice(2).map((tendance, index) => (
            <div key={tendance.id} className="mb-4">
              {renderTendanceItem(tendance, index + 2)}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-titre uppercase pt-12 pb-4">
          Avantages de s'entrainer
        </h2>

        <div className="flex flex-col pt-4 gap-12">
          {[
            "Améliore la santé mentale",
            "Améliore la santé physique",
            "Aide à dormir",
          ].map((advantage, index) => (
            <div
              key={index}
              className="border-b-2 border-dark pb-2 cursor-pointer"
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            >
              <h3 className="uppercase font-titre text-2xl lg:text-4xl">
                {advantage}
              </h3>

              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1 * index }}
                >
                  <p className="text-dark text-lg">
                    {index === 0
                      ? "L'exercice physique régulier peut aider à réduire l'anxiété, la dépression et le stress."
                      : index === 1
                      ? "L'exercice physique régulier peut vous aider à rester en forme et à réduire le risque de maladies chroniques."
                      : "L'exercice physique régulier peut vous aider à vous endormir plus rapidement et à améliorer la qualité de votre sommeil."}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark h-96 mt-12 mb-12  flex justify-center items-center relative">
      <img src="/LogoB.svg" alt="landing" className="w-full h-full object-cover absolute top-0 left-0 "
        style={{ opacity: 0.1 }}  
       />
        <h2 className="font-titre uppercase pt-12 pb-4 text-center text-white text-3xl lg:text-9xl">
          TON CORPS <br /> TON TEMPLE
        </h2>
      </div>
    </div>
  );
};

export default Tendances;
