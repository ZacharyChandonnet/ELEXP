import Heading from "../Heading";
import { motion } from "framer-motion";

const Faq = () => {
  return (
    <section>
      <Heading
        title="Tu as des questions?"
        paragraph="Voici les réponses aux questions les plus fréquemment posées dans le monde du fitness."
      />
      <motion.div
        initial={{ opacity: 0, x: -100 * 2 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-white flex flex-col gap-4 mt-12"
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quelle est la meilleure façon de perdre du poids?
          </h2>
          <p className="px-4 py-2">
            La meilleure façon de perdre du poids est de combiner une
            alimentation saine avec de l'exercice régulier. Il est important de
            consulter un professionnel de la santé avant de commencer un
            programme de perte de poids.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Combien de temps faut-il pour voir des résultats?
          </h2>
          <p className="px-4 py-2">
            Il faut généralement quelques semaines pour commencer à voir des
            résultats de ton programme d'entrainement. Cependant, les
            résultats peuvent varier en fonction de ton niveau de condition
            physique et de tes objectifs.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Pourquoi est-il important de s'étirer avant et après l'entrainement?
          </h2>
          <p className="px-4 py-2">
            Il est important de s'étirer avant et après l'entrainement pour
            prévenir les blessures et améliorer la flexibilité. Les étirements
            peuvent également aider à soulager la tension musculaire et à
            améliorer la circulation sanguine.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Comment puis-je rester motivé pour m'entrainer régulièrement?
          </h2>
          <p className="px-4 py-2">
            Pour rester motivé pour s'entrainer régulièrement, il est important
            de fixer des objectifs réalistes et de trouver un programme
            d'entrainement qui te convient. Il peut également être utile de
            trouver un partenaire d'entrainement ou de rejoindre un groupe
            d'entrainement.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quels sont les avantages de l'entrainement par intervalles?
          </h2>
          <p className="px-4 py-2">
            L'entrainement par intervalles est un excellent moyen d'améliorer
            l'endurance et de brûler des calories. Il peut également t'aider
            à améliorer ta vitesse et ta force.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quels sont les avantages de l'entrainement en circuit?
          </h2>
          <p className="px-4 py-2">
            L'entrainement en circuit est un excellent moyen d'améliorer la
            force et l'endurance. Il peut également t'aider à brûler des
            calories et à améliorer ta condition physique générale.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quels sont les avantages de l'entrainement en force?
          </h2>
          <p className="px-4 py-2">
            L'entrainement en force est un excellent moyen de renforcer les
            muscles et les os. Il peut également t'aider à brûler des
            calories et à améliorer ton métabolisme.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quels sont les avantages de l'entrainement en endurance?
          </h2>
          <p className="px-4 py-2">
            L'entrainement en endurance est un excellent moyen d'améliorer
            l'endurance et la santé cardiovasculaire. Il peut également 
            t'aider à brûler des calories et à améliorer ta condition physique
            générale.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quels sont les avantages de l'entrainement en Hypertrophie?
          </h2>
          <p className="px-4 py-2">
            L'entrainement en hypertrophie est un excellent moyen de développer
            la masse musculaire. Il peut également t'aider à brûler des
            calories et à améliorer ta force et ta endurance.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quels sont les avantages de l'entrainement en flexibilité?
          </h2>
          <p className="px-4 py-2">
            L'entrainement en flexibilité est un excellent moyen d'améliorer la
            mobilité et de prévenir les blessures. Il peut également t'aider
            à soulager la tension musculaire et à améliorer la circulation
            sanguine.
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "white",
            color: "black",
            border: "2px solid black",
            transition: { duration: 0.15 },
          }}
          className="faq bg-dark p-8"
        >
          <h2 className="font-titre lg:text-2xl uppercase">
            Quels sont les avantages de l'entrainement en groupe?
          </h2>
          <p className="px-4 py-2">
            L'entrainement en groupe peut être motivant et amusant. Il peut
            également t'aider à rester responsable et à rester sur la bonne
            voie avec tes objectifs de fitness.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Faq;
