import React from "react";
import { useUser } from "../Context/UserContext";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

const AjouterContact = ({ contact }) => {
  const { ajouterContact } = useUser();
  const [contacts, setContacts] = useState([]);

  const handleAjouterContact = async (contact) => {
    try {
      const updatedContacts = await ajouterContact(contact);
      setContacts(updatedContacts);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <button onClick={() => handleAjouterContact(contact)}>
      <IoIosAdd
        className="cursor-pointer  text-2xl"
      />
    </button>
  );
};

export default AjouterContact;