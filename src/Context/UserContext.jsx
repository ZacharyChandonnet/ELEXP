import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../Config/firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  query,
  where,
  orderBy,
  getDocs,
  or,
} from "firebase/firestore";

const UserContext = createContext({
  updateUser: async () => {},
  user: null,
  _v: 0,
});

const useUser = () => {
  const context = useContext(UserContext);
  if (context._v === 0) {
    throw new Error("useUser doit être utilisé dans un UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const { user } = useAuth();
  const [userInfos, setUserInfos] = useState(null);

  useEffect(() => {
    const getDocRef = async () => {
      const uuid = user.uid;
      const docRef = doc(db, "users", uuid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInfos(docSnap.data());
        // if (!docSnap.data().listePistesId) {
        //   createListePistesForUser(uuid);
        // } else {
        //   setListePistesId(docSnap.data().listePistesId);
        // }
      } else {
        try {
          await setDoc(docRef, {
            email: user.email,
            uuid: user.uid,
            name: user.displayName,
          });

          //   createListePistesForUser(uuid);
        } catch (error) {
          console.error("Error creating user document:", error);
        }
      }
    };

    if (user) {
      getDocRef();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user: userInfos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser };
