import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../Config/firebase";
import DailyQuest from "../Data/DailyQuest.json";
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
  creerDailyQuest: async () => {},
  afficherDailyQuest: async () => {},
  ajouterDailyQuestFini: async () => {},
  afficherDailyQuestFini: async () => {},
  ajouterExperience: async () => {},
  partirTimer: async () => {},
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
    const cooldownTime = 8 * 60 * 60 * 1000;

    if (currentTime - lastWorkoutTime >= cooldownTime) {
      const workoutDocRef = doc(db, "workouts", workoutId);
      const workoutDocSnap = await getDoc(workoutDocRef);

      if (workoutDocSnap.exists()) {
        const workoutData = workoutDocSnap.data();
        const experienceToAdd = workoutData.exercices.length * 10; 

        await updateDoc(userDocRef, {
          experience: userDocSnap.data().experience + experienceToAdd,
          cooldown: currentTime, 
        });

        const updatedHistory = [...userDocSnap.data().history, workoutId];
        await updateDoc(userDocRef, {
          history: updatedHistory,
        });
      }
    } else {
      console.log("Le cooldown n'est pas encore écoulé.");
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
  const creerDailyQuest = async () => {
    const uuid = user.uid;
    const dailyQuestId = genererId();

    const dailyQuestDocRef = doc(db, "dailyQuest", dailyQuestId);
  
    const currentTime = new Date().getTime();
    const lastDailyQuestTime = userInfos.lastDailyQuestTime || 0;
    const cooldownTime = 24 * 60 * 60 * 1000;

    if (currentTime - lastDailyQuestTime >= cooldownTime) {
      const randomIndex = Math.floor(Math.random() * DailyQuest.daily_quests.length);
      const randomQuest = DailyQuest.daily_quests[randomIndex];

      await setDoc(dailyQuestDocRef, { 
        id: dailyQuestId,
        name: randomQuest,
        user: uuid,
      });

     
      const userDocRef = doc(db, "users", uuid);
      await updateDoc(userDocRef, {
        lastDailyQuestTime: currentTime,
        userCompletedDailyQuest: false,
      });

      onSnapshot(userDocRef, (doc) => {
        setUserInfos(doc.data());
      });

      return randomQuest;
     
    }
  };


  const afficherDailyQuest = async () => {
    const uuid = user.uid;
    const dailyQuestRef = collection(db, "dailyQuest");
    const userDailyQuestQuery = query(dailyQuestRef, where("user", "==", uuid));

    const querySnapshot = await getDocs(userDailyQuestQuery); 
    const dailyQuests = [];

    querySnapshot.forEach((doc) => { 
    dailyQuests.push({ id: doc.id, ...doc.data() });
    });

   
    if (dailyQuests.length > 1) {
      for (let i = 0; i < dailyQuests.length - 1; i++) {
        const dailyQuestId = dailyQuests[i].id;
        const dailyQuestDocRef = doc(db, "dailyQuest", dailyQuestId);
        await deleteDoc(dailyQuestDocRef);
      }

    }

    return dailyQuests[0];
  };


  const ajouterDailyQuestFini = async () => {

    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    const dailyQuest = await afficherDailyQuest();
    const dailyQuestId = dailyQuest.id;
    const dailyQuestDocRef = doc(db, "dailyQuest", dailyQuestId);


    if (dailyQuest) {
      const dailyQuestData = dailyQuest.name;
      const experienceToAdd = dailyQuestData.experience;

      await updateDoc(userDocRef, {
        experience: userDocSnap.data().experience + experienceToAdd,
        userCompletedDailyQuest: true,
      });

      onSnapshot(userDocRef, (doc) => {
        setUserInfos(doc.data());
      });

      return dailyQuestData;
    }
   
  };

  const afficherDailyQuestFini = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const dailyQuestCompleted = [];

      for(const dailyQuestId of userData.dailyQuestCompleted){
        const dailyQuestDocRef = doc(db, "dailyQuest", dailyQuestId);
        const dailyQuestDocSnap = await getDoc(dailyQuestDocRef);

        if(dailyQuestDocSnap.exists()){
          dailyQuestCompleted.push({id: dailyQuestDocSnap.id, ...dailyQuestDocSnap.data()});
        }
      }
    }
  };

  const ajouterExperience = async (experienceToAdd) => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await updateDoc(userDocRef, {
        experience: userDocSnap.data().experience + experienceToAdd,
      });

      onSnapshot(userDocRef, (doc) => {
        setUserInfos(doc.data());
      });
    }
  };

  const partirTimer = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef); 

    const currentTime = new Date().getTime();
    const cooldownTime = 8 * 60 * 60 * 1000;
    const lastWorkoutTime = currentTime - cooldownTime;

    await updateDoc(userDocRef, {
      cooldown: currentTime,
    });

    onSnapshot(userDocRef, (doc) => {
      setUserInfos(doc.data());
    });

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
            dailyQuestCompleted: [],
            cooldown: 0,
            lastDailyQuestTime: 0,
            userCompletedDailyQuest: false,
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
        creerDailyQuest,
        afficherDailyQuest,
        ajouterDailyQuestFini,
        afficherDailyQuestFini,
        ajouterExperience,
        partirTimer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser };
