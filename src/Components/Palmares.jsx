import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Palmares = () => {
  const { user, afficherTopUser, setContact, contact } = useUser();
  const [topUsers, setTopUsers] = useState([]);
  const [positionUser, setPositionUser] = useState([]);

  useEffect(() => {
    const initializeTopUsers = async () => {
      try {
        const topUsers = await afficherTopUser();
        setTopUsers(topUsers || []);
        console.log(topUsers);
      } catch (error) {
        console.error("Erreur de contact:", error);
      }
    };

    initializeTopUsers();
  }, [afficherTopUser, user]);

  return (
    <div className="grid grid-cols-1 gap-12 justify-center items-center p-4">
      <div>
        {topUsers.map((user, index) => (
          <motion.div
            key={index}
            whileHover={{ backgroundColor: "#fff", color: "black" }}
            style={{
              color:"white",
            }}
          >
            <Link to={`/contact/${user.uuid}`} className="flex gap-12 items-center p-4" onClick={() => setContact(!contact)}>
              <div className="flex items-center gap-4">
                <p>{index + 1}.</p>
                <p className="font-titre text-2xl">{user.name}</p>
              </div>
              <p className="ml-auto font-bold">exp.{user.experience}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Palmares;
