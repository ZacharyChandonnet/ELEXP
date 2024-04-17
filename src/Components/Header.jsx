import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { motion } from "framer-motion";

const Header = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.header
      className="flex justify-between pt-8"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div>
        <Link to="/">ELEXP</Link>
      </div>

      <Navbar
        links={[
          {
            url: "/a-propos",
            name: "À propos",
            title: "À propos",
          },
          {
            url: "/entrainements",
            name: "Entrainements",
            title: "Entrainements",
          },
          {
            url: "/tendances",
            name: "Tendances",
            title: "Tendances",
          },
          // {
          //   url: "/forum",
          //   name: "Forum",
          //   title: "Forum",
          // },
        ]}
      />

      <div className="cursor-pointer" onClick={handleClick}>
        {user?.name}

        {isClicked && (
          <div className="flex flex-col absolute top-12 right-0">
            <Link to="/profil">Profil</Link>
            <button onClick={logout}>Déconnexion</button>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
