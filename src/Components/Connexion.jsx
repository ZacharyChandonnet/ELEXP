import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await login();
      if (result.success) {
        navigate("/");
      } else {
        throw new Error(`Erreur de connexion avec Google : ${result.message}`);
      }
    } catch (error) {
      console.error(`Erreur de connexion avec Google : ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Connexion avec Google</button>
    </div>
  );
};

export default Connexion;
