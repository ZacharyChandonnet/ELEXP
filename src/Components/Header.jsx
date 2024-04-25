import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { motion } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <img src={isMenuOpen ? "/LogoB.svg" : "/LogoD.svg"} alt="logo" className="relative z-50" style={{ width: "150px" }} />
      </Link>

      <div className="hidden md:flex">
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
      </div>

      <div onClick={handleMenu} className="md:hidden">
        <div className="relative z-50"
          style={{ color: isMenuOpen ? "white" : "black" }}
        >
          {isMenuOpen ? <IoMdClose size={40} /> : <RxHamburgerMenu size={40} />
          }
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 bg-dark w-screen h-screen z-30 overflow-y-auto"
          >
            <div className="flex flex-col absolute top-12 right-0 bg-dark text-white w-screen h-screen z-40 overflow-y-auto">
              <div className="flex flex-col justify-center items-center h-full w-full">
                <Link to="/a-propos" className="mx-2 my-2">
                  À propos
                </Link>
                <Link to="/entrainements" className="mx-2 my-2">
                  Entrainements
                </Link>
                <Link to="/programmes" className="mx-2 my-2">
                  Programmes
                </Link>
                <Link to="/profil" className="mx-2 my-2">
                  Profil
                </Link>
                <button className="mx-2 my-2" onClick={logout}>
                  Déconnexion
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
      <div className="cursor-pointer" onClick={handleClick}>


        <p className="hidden md:flex">
          {user?.name} exp.{user?.experience}
        </p>

        {isClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col absolute top-12 right-0 bg-dark text-white  m-12">
              <Link to="/profil" className="mx-2 my-2">
                Profil
              </Link>
              <button className="mx-2 my-2" onClick={logout}>
                Déconnexion
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
