import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import RechercheContact from "./RechercheContact";
import Palmares from "./Palmares";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CSS/Contact.css";

const Contact = () => {
  const { user, rechercherUserNom, afficherContacts } = useUser();
  const [userNom, setUserNom] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await rechercherUserNom(searchTerm);
      setUserNom(results);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim().length >= 2) {
      setTimeout(() => {
        handleSearch();
      }, 200);
    } else {
      setUserNom([]);
    }
  };

  useEffect(() => {
    const initializeContacts = async () => {
      try {
        const userContacts = await afficherContacts();
        setContacts(userContacts || []);
      } catch (error) {
        console.error("Erreur de contact:", error);
      }
    };

    initializeContacts();
  }, [afficherContacts, user]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Palmares />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <input
            type="text"
            placeholder="Recherche d'un utilisateur"
            value={searchTerm}
            onChange={handleChange}
            className="input-search bg-none text-white p-2 w-full italic "
            autoFocus
          />
          <p className="text-white text-sm p-2">
            Voici les résultats pour : {searchTerm}
          </p>
          <RechercheContact searchResults={userNom} />
        </div>
        <div className="bg-white ">
          <p className="text-dark text-xl font-bold font-titre p-4">
            Mes contacts
          </p>
          {contacts.length > 0 ? (
            <div className="overflow-y-auto h-64">
              {contacts.map((contact, index) => (
                <motion.div
                  className="text-dark text-lg"
                  whileHover={{ backgroundColor: "black", color: "#fff" }}
                  transition={{ duration: 0.5 }}
                  key={index}
                >
                  <Link to={`/contact/${contact.uuid}`}>
                    <div className="flex justify-center items-center p-8">
                      <p className="mr-auto font-titre">{contact.name}</p>
                      <p className="text-lg font-bold">
                        {" "}
                        exp.{contact.experience}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-white text-lg">Pas de contacts</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
