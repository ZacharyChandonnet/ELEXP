import { auth } from "../Config/firebase";
import { useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import React from "react";

const authContext = React.createContext({
  login: async () => {},
  register: async () => {},
  logout: () => {},
  user: null,
  _v: 0,
});

const useAuth = () => {
  const context = useContext(authContext);
  if (context._v === 0) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const creds = await signInWithPopup(auth, provider);
      setUser(creds.user);
      return { success: true, message: "Connexion réussie" };
    } catch (error) {
      return {
        success: false,
        message: "Échec de la connexion. Veuillez réessayer.",
      };
    }
  };

  const register = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const creds = await signInWithPopup(auth, provider);
      setUser(creds.user);
      return { success: true, message: "Inscription réussie" };
    } catch (error) {
      return {
        success: false,
        message: "Échec de l'inscription. Veuillez réessayer.",
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erreur de déconnexion : ", error);
    }
  };

  return (
    <authContext.Provider value={{ _v: 1, login, register, logout, user }}>
      {!loading && children}
    </authContext.Provider>
  );
};

export { AuthProvider, useAuth, authContext };
