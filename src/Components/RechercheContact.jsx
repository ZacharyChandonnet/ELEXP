import AjouterContact from "./AjouterContact";

const RechercheContact = ({ searchResults }) => {
  return (
    <div>
      <ul className="my-6">
        {searchResults.map((user) => (
          <li className="text-white" key={user.email}>
            {user.name}
            <AjouterContact contact={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RechercheContact;
