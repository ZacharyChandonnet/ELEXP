import { motion } from "framer-motion";

const BarrerExperience = ({currentRank, nextRank, nextRankExp, progressPercent, currentExperience}) => {
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
                <p>{nextRank}</p>
            </div>
            <p className="text-center font-bold italic">
                {nextRankExp - currentExperience}XP restants
            </p>
        </div>
    )
}


export default BarrerExperience;