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
  createWorkout: async () => {}, 
  afficherWokoutDetails: async () => {},

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
  
  

  const genererId = () => {
    return new Date().getTime().toString();
  };

const createWorkout = async (workoutName, selectedExercises) => {
    const uuid = user.uid;
    const workoutId = genererId();
    const useDocRef = doc(db, "users", uuid);

    await setDoc(
        useDocRef,
        {
            workout: arrayUnion({
                id: workoutId,
                name: workoutName,
            }),
        },
        { merge: true }
    );

    const workoutDocRef = doc(db, "workouts", workoutId);
    await setDoc(workoutDocRef, {  
        uuid: workoutId,
        name: workoutName,
        user: uuid,
        exercices: selectedExercises,
    });

    // Après avoir ajouté le nouvel entraînement, mettez à jour automatiquement les détails de l'entraînement
    await afficherWokoutDetails();
};




const afficherWokoutDetails = async () => {
  const uuid = user.uid;
  const workoutsRef = collection(db, "workouts");
  const userWorkoutsQuery = query(
    workoutsRef,
    where("user", "==", uuid)
  );

  const querySnapshot = await getDocs(userWorkoutsQuery);
  const workouts = [];

  querySnapshot.forEach((doc) => {
    workouts.push({ id: doc.id, ...doc.data() });
  });
  

  return workouts;
};


  useEffect(() => {
    const getDocRef = async () => {
      const uuid = user.uid;
      const docRef = doc(db, "users", uuid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserInfos(docSnap.data());

        onSnapshot(docRef, (doc) => {
          setUserInfos(doc.data());
        }
        );
       
      } else {
        try {
          await setDoc(docRef, {
            email: user.email,
            uuid: user.uid,
            name: user.displayName,
            workout: [],
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
        createWorkout,
        afficherWokoutDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser };
