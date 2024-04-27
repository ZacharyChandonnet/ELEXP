import AjouterContact from "./AjouterContact";
import {Link} from "react-router-dom";

const RechercheContact = ({ searchResults }) => {
  return (
    <div >
      <ul className="my-4">
        {searchResults.map((user) => (
          <li className="text-white flex items-center gap-2 mt-2" key={user.email}>
            <Link to={`/contact/${user.uuid}`}> {user.name} </Link>
            <AjouterContact contact={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RechercheContact;
