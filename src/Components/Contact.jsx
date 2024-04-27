import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import RechercheContact from "./RechercheContact";
import Palmares from "./Palmares";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Palmares />
      </div>
      <div>
        <div className="input">
          <input
            type="text"
            placeholder="Oh, qui cherchez vous ?"
            value={searchTerm}
            onChange={handleChange}
            className="input-search placeholder:text-lg"
            autoFocus
          />
        </div>

        <p className="text-white text-lg font-bold">
          Voici les résultats pour {searchTerm}
        </p>

        <RechercheContact searchResults={userNom} />

        <p className="text-white text-lg font-bold">Mes contacts</p>
        {contacts.length > 0 ? (
          <div>
            {contacts.map((contact, index) => (
              <div key={index} className="flex justify-between">
                <Link
                  to={`/contact/${contact.uuid}`}
                  className="text-white text-lg"
                >
                  {contact.name}
                </Link>
                <p className="text-white text-lg"> exp.{contact.experience}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-lg">Pas de contacts</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
