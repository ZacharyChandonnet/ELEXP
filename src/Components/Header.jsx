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
      className="flex justify-between pt-8 border-b-2 border-dark py-6 items-center "
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      
        <Link to="/">
          <img src="LogoD.svg" alt="logo" 
          style={{width: "150px"}}/>

        </Link>
     

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
            url: "/programmes",
            name: "Programmes",
            title: "Programmes",
          },
          // {
          //   url: "/forum",
          //   name: "Forum",
          //   title: "Forum",
          // },
        ]}
      />

      <div className="cursor-pointer" onClick={handleClick}>
        <p>{user?.name} exp.{user?.experience}</p>


        {isClicked && (
          <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            transition={{ duration: .5 }}
          >
            <div className="flex flex-col absolute top-12 right-0 bg-dark text-white  m-12">
              <Link to="/profil" className="mx-2 my-2">Profil</Link>
              <button  className="mx-2 my-2" onClick={logout}>Déconnexion</button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
