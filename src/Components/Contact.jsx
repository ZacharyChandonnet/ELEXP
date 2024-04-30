import { useState, useEffect } from "react";
import { useUser } from "../Context/UserContext";
import RechercheContact from "./RechercheContact";
import Palmares from "./Palmares";
import { m, motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CSS/Contact.css";
import { FaTrash } from "react-icons/fa6";

const Contact = () => {
  const {
    user,
    rechercherUserNom,
    afficherContacts,
    retirerContact,
    setContact,
    contact,
    creerGroupeChat,
    ajouterMessage,
    afficherMessage,
  } = useUser();
  const [userNom, setUserNom] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [chat, setChat] = useState(false);
  const [message, setMessage] = useState("");
  const [listeMessages, setListeMessages] = useState([]);
  const [lesMessages, setLesMessages] = useState([]);

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
    const initializeMessages = async () => {
      try {
        const messages = await afficherMessage();
        setLesMessages(messages || []);
      } catch (error) {
        console.error("Erreur de message:", error);
      }
    };

    initializeMessages();
  }, [afficherMessage, user]);

  const handleCreerGroupeChat = async (contact) => {
    setChat(!chat);
    setContact(contact);

    try {
      await creerGroupeChat(contact);
    } catch (error) {
      console.error("Error creating chat group:", error);
    }
  };

  const handleAjouterMessage = async (message) => {
    try {
      await ajouterMessage(message);
      setListeMessages((prevMessages) => [...prevMessages, message]);
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const handleRetirerContact = async (contact) => {
    try {
      await retirerContact(contact);
      setContacts((prevContacts) =>
        prevContacts.filter((c) => c.email !== contact.email)
      );
    } catch (error) {
      console.error("Error removing contact:", error);
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

  const fetchNewMessages = async () => {
    try {
      const messages = await afficherMessage();
      setLesMessages(messages || []);
    } catch (error) {
      console.error("Erreur de message:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNewMessages();
    }, 1500);

    return () => clearInterval(interval);
  }, [afficherMessage]);

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
            <div className="">
              {contacts.map((contact, index) => (
                <motion.div
                  className="text-dark text-lg"
                  whileHover={{ backgroundColor: "black", color: "#fff" }}
                  transition={{ duration: 0.5 }}
                  key={index}
                >
                  <div className="flex justify-center items-center p-8">
                    <Link
                      to={`/contact/${contact.uuid}`}
                      onClick={() => setContact(!contact)}
                    >
                      <p className="mr-auto font-titre">{contact.name}</p>
                    </Link>
                    <p className="text-lg font-bold  ml-auto flex items-center gap-4">
                      exp.{contact.experience}
                      <FaTrash
                        className="cursor-pointer"
                        onClick={() => handleRetirerContact(contact)}
                      />
                      <p
                        onClick={() => handleCreerGroupeChat(contact)}
                        className="cursor-pointer"
                      >
                        +
                      </p>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-white text-lg">Pas de contacts</p>
          )}
        </div>
      </div>

      {chat && (
        <div className="bg-white">
          {lesMessages.map((message, index) => (
            <div className="bg-white" key={index}>
              <p className="text-dark text-lg font-titre p-4">
                {message.messager}
              </p>
              <p className="text-dark text-lg  p-4">
                {message.message}
              </p>
            </div>
          ))}

          <input
            type="text"
            placeholder="Ajouter un message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-search bg-none text-white p-2 w-full italic "
          />
          <button
            className="bg-blue-500 text-white p-2 w-full"
            onClick={() => handleAjouterMessage(message)}
          >
            Ajouter
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
