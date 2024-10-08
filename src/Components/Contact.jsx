import { useState, useEffect, useRef } from "react";
import { useUser } from "../Context/UserContext";
import RechercheContact from "./RechercheContact";
import Palmares from "./Palmares";
import { m, motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CSS/Contact.css";
import { FaTrash } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

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
    lesMessages,
    setLesMessages,
  } = useUser();
  const [userNom, setUserNom] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [chat, setChat] = useState(false);
  const [message, setMessage] = useState("");
  const [listeMessages, setListeMessages] = useState([]);

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
      setMessage("");
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

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lesMessages]);



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
                  <div className="flex justify-center items-center gap-4 p-8">
                    <Link
                      to={`/contact/${contact.uuid}`}
                      onClick={() => setContact(!contact)}
                    >
                      <p className="mr-auto font-titre">{contact.name}</p>
                    </Link>
                    <p
                      onClick={() => handleCreerGroupeChat(contact)}
                      className="cursor-pointer text-2xl"
                    >
                      <IoIosChatboxes />
                    </p>
                    <p className="text-lg font-bold  ml-auto flex items-center gap-4">
                      exp.{contact.experience}
                      <FaTrash
                        className="cursor-pointer"
                        onClick={() => handleRetirerContact(contact)}
                      />
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
        <div className="bg-dark absolute top-0 left-1/2 transform -translate-x-1/2 text-white h-screen w-full p-24 z-50 "
        >
          <h2 className="font-titre lg:text-3xl uppercase border-b-2 border-white w-1/2 p-2"> Conversation avec {contact.name}</h2>
          <div className="fenetre overflow-y-scroll "
         
          >
            {lesMessages.map((message, index) => (
              <div key={index} ref={index === lesMessages.length - 1 ? messageEndRef : null} className={`${message.messager === user.name ? "text-right pr-4" : "text-left pl-4"}`}>
                <p className="py-4"
                >
                  <span className="font-titre">{message.messager}</span> <br />
                  <span>{message.message}</span>
                </p>
              </div>
            ))}

            <div className="message absolute bottom-0 w-1/2 lg:w-full mb-12 lg:mb-24">
              <input
                type="text"
                placeholder="Ajouter un message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-search bg-none text-white p-2 w-full"
                onKeyPress={(e) => e.key === "Enter" && handleAjouterMessage(message)}
              />
              <button
                className="bg-dark text-white p-2 w-full"
                onClick={() => handleAjouterMessage(message)}
              >
                <IoIosSend size={20} />
              </button>
            </div>

            <div>
              <button
                className="absolute top-0 right-0 text-white p-12"
                onClick={() => setChat(!chat)}
              >
                <IoMdClose size={40} />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
