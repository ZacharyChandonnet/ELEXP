import { Link } from "react-router-dom";

const NavBar = ({ links }) => {
  return (
    <ul className="flex justify-center gap-4">
      {links.map(({ url, name, onClick, title }) => {
        return (
          <li key={url}>
            <Link to={url} onClick={onClick} title={title}>
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavBar;
