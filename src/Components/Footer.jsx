import "./CSS/Footer.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useUser } from "../Context/UserContext";

const Footer = () => {

    const { logout } = useAuth();
    const {setContact, contact} = useUser();

    return (
        <footer
            className="text-dark border-t-2 border-dark mt-12">
            <div className="top">
                <figure>
                    <Link to="/accueil">
                        <img src="/LogoD.svg" alt="Logo" />
                    </Link>
                </figure>
                <div className="ml-auto">
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
                                name: "FAQ",
                                title: "FAQ",
                            }
                        ]}
                    />
                    <div className="text-right flex flex-col gap-4">
                        <a href="/profil" className="onHover pt-4">Profil</a>

                        <button onClick={() => setContact(!contact)} className="onHover">Classement</button>



                        <button
                            onClick={logout}
                            className="onHover">Déconnexion</button>

                    </div>

                    <ul>

                    </ul>
                </div>
            </div>
            <div className="bottom border-t-2 border-dark  flex items-center justify-between text-sm pb-4">
                <p >
                    Application réalisée par <a target="blank" href="https://chandodev.netlify.app"><span className="font-bold">Zachary Chandonnet</span></a>
                </p>
                <p>
                    &copy;{new Date().getFullYear()} Tous droits réservés
                </p>
            </div>
        </footer>
    );
}

export default Footer;