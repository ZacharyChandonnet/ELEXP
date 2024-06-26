import Navbar from "./Navbar";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Contact from "./Contact";
import { FaUserAlt } from "react-icons/fa";

const Header = () => {
  const { user, setContact, contact } = useUser();
  const { logout } = useAuth();
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [position, setPosition] = useState(0);

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
        <img
          src={isMenuOpen ? "/LogoB.svg" : "/LogoD.svg"}
          alt="logo"
          className="relative z-50"
          style={{ width: "150px" }}
        />
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
              name: "Entraînements",
              title: "Entrainements",
            },
            {
              url: "/programmes",
              name: "Programmes",
              title: "Programmes",
            },
            {
              url: "/faq",
              name: "Faq",
              title: "faq",
            },
          ]}
        />
      </div>

      <div onClick={handleMenu} className="md:hidden">
        <div
          className="relative z-50"
          style={{ color: isMenuOpen ? "white" : "black" }}
        >
          {isMenuOpen ? <IoMdClose size={40} /> : <RxHamburgerMenu size={40} />}
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

                <Link to="/faq" className="mx-2 my-2">
                  Faq
                </Link>

                <Link to="/profil" className="mx-2 my-2">
                  Profil
                </Link>
                <button
                  onClick={() => setContact(!contact)}
                  className="mx-2 my-2"
                >
                  Classement
                </button>
                <button className="mx-2 my-2" onClick={logout}>
                  Déconnexion
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={handleClick}
      >
        <motion.p
          whileHover={{ scale: 1.025, opacity: 0.5 }}
          className="hidden md:flex gap-2 item-center"
        >
          <p>{user?.name}</p> <p className="font-bold"> exp.{user?.experience}</p>
          <p style={{
            paddingTop: ".2rem",
          }}> 
            <FaUserAlt size={15} />
          </p>
        </motion.p>

        {isClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col absolute top-12 right-0 bg-dark text-white mt-12 mr-12 z-40">
              <Link to="/profil" className="mx-2 my-2">
                Profil
              </Link>
              <button
                onClick={() => setContact(!contact)}
                className="mx-2 my-2 mr-auto"
              >
                Classement
              </button>
              <button className="mx-2 my-2" onClick={logout}>
                Déconnexion
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {contact && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-screen h-screen bg-dark bg-opacity-90 flex justify-center items-center  z-50 backdrop-filter backdrop-blur-lg"
          >
            <p className="cursor-pointer absolute top-0 right-0 text-white z-50 p-12">
              <IoMdClose size={40} onClick={() => setContact(!contact)} />
            </p>
            <div className="grid grid-cols-1 justify-center items-center w-9/12">
              <p className="text-white font-titre text-center lg:text-5xl uppercase border-b-2 border-white pb-4">
                CLASSEMENT
              </p>
              <Contact />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.header>
  );
};

export default Header;
