import React, { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AjouterContact from "./AjouterContact";

const Palmares = () => {
  const { user, afficherTopUser, setContact, afficherPosition } = useUser();
  const [topUsers, setTopUsers] = useState([]);
  const [position, setPosition] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const initializeTopUsers = async () => {
      try {
        const topUsers = await afficherTopUser();
        setTopUsers(topUsers || []);
      } catch (error) {
        console.error("Erreur de contact:", error);
      }
    };

    initializeTopUsers();
  }, [afficherTopUser, user]);

  useEffect(() => {
    if (user) {
      afficherPosition().then((res) => {
        setPosition(res);
      });
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 gap-12 justify-center items-center p-4">
      <div>
        {topUsers.map((user, index) => (
          <motion.div
            key={index}
            whileHover={{ backgroundColor: "#fff", color: "black" }}
            style={{
              color: "white",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex gap-12 items-center p-4">
              <Link
                to={`/contact/${user.uuid}`}
                onClick={() => setContact(!contact)}
              >
                <div className="flex items-center gap-4">
                  <p>{index + 1}.</p>
                  <p className="font-titre text-2xl">{user.name}</p>
                </div>
              </Link>
              <p className="ml-auto font-bold">exp.{user.experience}</p>
              <div
                style={{ color: hoveredIndex === index ? "black" : "white" }}
              >
                <AjouterContact contact={user} />
              </div>
            </div>
          </motion.div>
        ))}
        <p className="text-white text-sm italic">
          <span className="font-bold font-titre uppercase">{user.name}</span>{" "}
          est {position}
        </p>
      </div>
    </div>
  );
};

export default Palmares;
