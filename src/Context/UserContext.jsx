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
  arrayRemove,
} from "firebase/firestore";

const UserContext = createContext({
  updateUser: async () => {},
  createWorkout: async () => {},
  afficherWokoutDetails: async () => {},
  supprimerEntrainement: async () => {},
  afficherExperience: async () => {},
  ajouterWorkoutFini: async () => {},
  afficherWorkoutFini: async () => {},
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
  const [lastWorkoutTime, setLastWorkoutTime] = useState(null);

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

    onSnapshot(useDocRef, (doc) => {
      setUserInfos(doc.data());
    });
  };

  const supprimerEntrainement = async (workoutId) => {
    const uuid = user.uid;

    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const updatedWorkouts = userData.workout.filter(
        (item) => item.id !== workoutId
      );

      await updateDoc(userDocRef, {
        workout: updatedWorkouts,
      });

      const workoutDocRef = doc(db, "workouts", workoutId);
      await deleteDoc(workoutDocRef);

      await afficherWokoutDetails();
    }
  };

  const afficherWokoutDetails = async () => {
    const uuid = user.uid;
    const workoutsRef = collection(db, "workouts");
    const userWorkoutsQuery = query(workoutsRef, where("user", "==", uuid));

    const querySnapshot = await getDocs(userWorkoutsQuery);
    const workouts = [];

    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });

    return workouts;
  };

  const afficherExperience = (callback) => {
    const uuid = user.uid;
    const docRef = doc(db, "users", uuid);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      const experience = doc.data().experience;
      callback(experience);
    });

    return unsubscribe;
  };

  const ajouterWorkoutFini = async (workoutId) => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    const currentTime = new Date().getTime();
    const lastWorkoutTime = userDocSnap.data().cooldown || 0;
    const cooldownTime =  60 * 1000; // 1 minute

    if (currentTime - lastWorkoutTime >= cooldownTime) {
      const workoutDocRef = doc(db, "workouts", workoutId);
      const workoutDocSnap = await getDoc(workoutDocRef);

      if (workoutDocSnap.exists()) {
        const workoutData = workoutDocSnap.data();
        const experienceToAdd = workoutData.exercices.length * 10;

        await updateDoc(userDocRef, {
          experience: userDocSnap.data().experience + experienceToAdd,
          cooldown: currentTime // Mettre à jour la date de cooldown
        });

        const updatedHistory = [...userDocSnap.data().history, workoutId];
        await updateDoc(userDocRef, {
          history: updatedHistory,
        });
      }
    } else {
      console.log("Le cooldown n'est pas encore écoulé.");
      // Gérer le cas où le cooldown n'est pas encore écoulé
    }
  };

  useEffect(() => {
    const fetchLastWorkoutTime = async () => {
      const uuid = user.uid;
      const userDocRef = doc(db, "users", uuid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.lastWorkoutTime) {
          setLastWorkoutTime(userData.lastWorkoutTime.toDate().getTime());
        }
      }
    };

    fetchLastWorkoutTime();
  }, []);

  const afficherWorkoutFini = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const history = [];

      for (const workoutId of userData.history) {
        const workoutDocRef = doc(db, "workouts", workoutId);
        const workoutDocSnap = await getDoc(workoutDocRef);

        if (workoutDocSnap.exists()) {
          history.push({ id: workoutDocSnap.id, ...workoutDocSnap.data() });
        }
      }

      return history;
    }
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
        });
      } else {
        try {
          await setDoc(docRef, {
            email: user.email,
            uuid: user.uid,
            name: user.displayName,
            workout: [],
            experience: 0,
            history: [],
            cooldown: 0,
          });
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
        supprimerEntrainement,
        afficherExperience,
        ajouterWorkoutFini,
        afficherWorkoutFini,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser };
