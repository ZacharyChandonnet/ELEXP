import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Palmares = () => {
  const { user, afficherTopUser } = useUser();
  const [topUsers, setTopUsers] = useState([]);

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
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h1>Palmarès</h1>
        {topUsers.map((user, index) => (
          <div key={index}>
            <Link to={`/contact/${user.uuid}`} className="flex">
              <h2>{user.name}</h2>
              <p>{user.experience}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palmares;
