import { motion } from "framer-motion";

const BarrerExperience = ({ allRanks, currentRank, nextRank, nextRankExp, progressPercent, currentExperience }) => {
    return (
        <div className="my-12">
            <div className="flex gap-4 items-center font-titre">
                <p>
                    {currentRank}
                    <br />
                    exp.{currentExperience}
                </p>
                <div style={{ width: "100%", border: "1px solid black" }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <div
                            style={{
                                width: `${progressPercent}%`,
                                backgroundColor: "black",
                                height: "1.5rem",
                            }}
                        ></div>
                    </motion.div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div>
                        <p>{nextRank}</p>
                    </div>



                </div>
            </div>
            <p className="text-center font-bold italic">
                {nextRankExp - currentExperience}XP restants
            </p>
            <div className=" flex text-sm gap-12 justify-center items-center text-gray-500 font-bold pt-4 italic">
                <p>
                    Débutant : exp.{allRanks.Débutant} </p>
                <p>
                    Intermédiaire : exp.{allRanks.Intermédiaire}
                </p>
                <p>
                    Avancé : exp.{allRanks.Avancé}
                </p>
                <p>
                    Expert : exp.{allRanks.Expert}
                </p>
                <p>
                    Maître : exp.{allRanks.Maître}
                </p>
                <p>
                    Sage : exp.{allRanks.Sage}
                </p>
                <p>
                    Immortel : exp.{allRanks.Immortel}
                </p>
            </div>
        </div>
    )
}


export default BarrerExperience;