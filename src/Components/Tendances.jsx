import { Link } from "react-router-dom";
import TendanceData from "../Data/TendanceData";
import Heading from "./Heading";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { motion } from "framer-motion";

const Tendances = () => {
  const { user, ajouterExperience } = useUser();
  const [isAbleToAccess, setIsAbleToAccess] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (user && user.experience >= 30) {
      setIsAbleToAccess(true);
    } else {
      setIsAbleToAccess(false);
    }
  }, [user]);

  const tendanceThresholds = [30, 90, 120];

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const renderTendanceItem = (tendance, index) => {
    const requiredExperience = tendanceThresholds[index] || 0;

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
              ? `/tendances/${tendance.id}`
              : "/tendances"
          }
          style={{ textDecoration: "none" }}
        >
          <div
            className={`pt-12 bg-dark text-white  px-4 ${
              !isAbleToAccess || (user && user.experience < requiredExperience)
                ? "opacity-50"
                : ""
            }`}
          >
            <div className="flex flex-col-reverse justify-between h-40 pb-6">
              <div className="flex justify-between items-end">
                <h5 className="uppercase font-titre text-4xl">
                  {tendance.title}
                </h5>
                <div className="btn btn-primary text-4xl">
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
        Entrainements tendances
      </h2>
      <div>
        {TendanceData.map((tendance, index) =>
          renderTendanceItem(tendance, index)
        )}
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

      <div className="bg-dark h-96 mt-12 mb-12  flex justify-center items-center">
        <h2 className="font-titre uppercase pt-12 pb-4 text-center text-white text-3xl lg:text-9xl">
          TON CORPS <br /> TON TEMPLE
        </h2>
      </div>
    </div>
  );
};

export default Tendances;
