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
  updateUser: async () => { },
  createWorkout: async () => { },
  afficherWokoutDetails: async () => { },
  supprimerEntrainement: async () => { },
  afficherExperience: async () => { },
  ajouterWorkoutFini: async () => { },
  afficherWorkoutFini: async () => { },
  creerDailyQuest: async () => { },
  afficherDailyQuest: async () => { },
  ajouterDailyQuestFini: async () => { },
  afficherDailyQuestFini: async () => { },
  ajouterExperience: async () => { },
  partirTimer: async () => { },
  ajouterWorkoutTendance: async () => { },
  afficherDateEntrainementTendance: async () => { },
  supprimerExerciceWorkout: async () => { },
  ajouterExercicesAuWorkout: async () => { },
  creerObjectif: async () => { },
  afficherObjectifs: async () => { },
  deleteObjectif: async () => { },
  objectifCompleted: async () => { },
  setRerolltoTrue: async () => { },
  setRerolltoFalse: async () => { },
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

  const supprimerExerciceWorkout = async (workoutId, exerciseName) => {
    const workoutDocRef = doc(db, "workouts", workoutId);
    const workoutDocSnap = await getDoc(workoutDocRef);

    if (workoutDocSnap.exists()) {
      const workoutData = workoutDocSnap.data();
      const updatedExercises = workoutData.exercices.filter(
        (exercise) => exercise !== exerciseName
      );

      await updateDoc(workoutDocRef, {
        exercices: updatedExercises,
      });
      return updatedExercises;
    } else {
      console.error("L'entrainement n'existe pas.");
    }
  };

  const ajouterExercicesAuWorkout = async (workoutId, selectedExercises) => {
    const workoutDocRef = doc(db, "workouts", workoutId);
    const workoutDocSnap = await getDoc(workoutDocRef);

    if (workoutDocSnap.exists()) {
      const workoutData = workoutDocSnap.data();
      const updatedExercises = [...workoutData.exercices, ...selectedExercises];

      await updateDoc(workoutDocRef, {
        exercices: updatedExercises,
      });
      return updatedExercises;
    } else {
      console.error("L'entrainement n'existe pas.");
    }

    return updatedExercises;
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

        const updatedHistory = [
          ...userDocSnap.data().history,
          { workoutId, date: currentTime },
        ];
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

      for (const workout of userData.history) {
        const workoutDocRef = doc(db, "workouts", workout.workoutId);
        const workoutDocSnap = await getDoc(workoutDocRef);

        if (workoutDocSnap.exists()) {
          history.push({
            id: workoutDocSnap.id,
            ...workoutDocSnap.data(),
            date: workout.date,
          });
        }
      }

      return history;
    }
  };

  const creerDailyQuest = async () => {
    const uuid = user.uid;
    const currentTime = new Date().getTime();
    const lastDailyQuestTime = userInfos.lastDailyQuestTime || 0;
    const cooldownTime = 24 * 60 * 60 * 1000;

    if (currentTime - lastDailyQuestTime >= cooldownTime) {
      const dailyQuestId = genererId();
      const dailyQuestDocRef = doc(db, "dailyQuest", dailyQuestId);
      const randomIndex = Math.floor(
        Math.random() * DailyQuest.daily_quests.length
      );
      const randomQuest = DailyQuest.daily_quests[randomIndex];

      await setDoc(dailyQuestDocRef, {
        id: dailyQuestId,
        name: randomQuest,
        user: uuid,
        date: new Date().getTime(),
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

    const userDocRef = doc(db, "users", uuid);
    onSnapshot(userDocRef, (doc) => {
      setUserInfos(doc.data());
    });


    return dailyQuests[0];
  };

  const ajouterDailyQuestFini = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    const dailyQuest = await afficherDailyQuest();
    const dailyQuestId = dailyQuest.id;
    const dailyQuestDocRef = doc(db, "dailyQuest", dailyQuestId);

    await updateDoc(dailyQuestDocRef, {
      date: new Date().getTime(),
    });

    if (dailyQuest) {
      const dailyQuestData = dailyQuest.name;
      const experienceToAdd = dailyQuestData.experience;

      await updateDoc(userDocRef, {
        dailyQuestCompleted: arrayUnion(dailyQuestId),
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

      for (const dailyQuestId of userData.dailyQuestCompleted) {
        const dailyQuestDocRef = doc(db, "dailyQuest", dailyQuestId);
        const dailyQuestDocSnap = await getDoc(dailyQuestDocRef);

        if (dailyQuestDocSnap.exists()) {
          dailyQuestCompleted.push({
            id: dailyQuestDocSnap.id,
            ...dailyQuestDocSnap.data(),
          });
        }
      }

      return dailyQuestCompleted;
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

  const ajouterWorkoutTendance = async (workoutId) => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      let tendances = [...userData.entrainementsTendance];

      tendances.push({ id: workoutId, date: new Date().getTime() });

      await updateDoc(userDocRef, {
        entrainementsTendance: tendances,
      });

      onSnapshot(userDocRef, (doc) => {
        setUserInfos(doc.data());
      });

      return tendances;
    }
  };

  const afficherDateEntrainementTendance = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const tendances = userData.entrainementsTendance || [];
      const dates = tendances.map((tendance) => tendance.date);
      return dates;
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

  const creerObjectif = async (objectif) => {
    const uuid = user.uid;
    const objectifId = genererId();
    const objectifDocRef = doc(db, "objectifs", objectifId);

    await setDoc(objectifDocRef, {
      id: objectifId,
      titre: objectif.titre,
      description: objectif.description,
      user: uuid,
      isCompleted: false,
    });

    const userDocRef = doc(db, "users", uuid);
    await updateDoc(userDocRef, {
      objectifs: arrayUnion(objectifId),
    });

    onSnapshot(userDocRef, (doc) => {
      setUserInfos(doc.data());
    });

    return objectif;
  };

  const deleteObjectif = async (objectifId) => {
    const objectifDocRef = doc(db, "objectifs", objectifId);
    await deleteDoc(objectifDocRef);

    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    await updateDoc(userDocRef, {
      objectifs: arrayRemove(objectifId),
    });

    onSnapshot(userDocRef, (doc) => {
      setUserInfos(doc.data());
    });
  };

  const objectifCompleted = async (objectifId) => {
    const currentDate = new Date().getTime();
    const objectifDocRef = doc(db, "objectifs", objectifId);
    await updateDoc(objectifDocRef, {
      isCompleted: true,
      dateCompleted: currentDate,
    });

    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    onSnapshot(userDocRef, (doc) => {
      setUserInfos(doc.data());
    });
  };
  const afficherObjectifs = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const objectifs = [];

      for (const objectifId of userData.objectifs) {
        const objectifDocRef = doc(db, "objectifs", objectifId);
        const objectifDocSnap = await getDoc(objectifDocRef);

        if (objectifDocSnap.exists()) {
          objectifs.push({
            id: objectifDocSnap.id,
            ...objectifDocSnap.data(),
          });
        }
      }

      return objectifs;
    }
  };

  const setRerolltoTrue = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    await updateDoc(userDocRef, {
      reroll: true,
    });

    onSnapshot(userDocRef, (doc) => {
      setUserInfos(doc.data());
    });
  };

  const setRerolltoFalse = async () => {
    const uuid = user.uid;
    const userDocRef = doc(db, "users", uuid);
    await updateDoc(userDocRef, {
      reroll: false,
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
            entrainementsTendance: [],
            cooldown: 0,
            lastDailyQuestTime: 0,
            userCompletedDailyQuest: false,
            reroll: false,
            objectifs: [],
          }); setUserInfos({ email: user.email, uuid: user.uid, name: user.displayName, workout: [], experience: 0, history: [], dailyQuestCompleted: [], entrainementsTendance: [], cooldown: 0, lastDailyQuestTime: 0, userCompletedDailyQuest: false, reroll: false, objectifs: [] });
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
        ajouterWorkoutTendance,
        afficherDateEntrainementTendance,
        supprimerExerciceWorkout,
        ajouterExercicesAuWorkout,
        creerObjectif,
        afficherObjectifs,
        deleteObjectif,
        objectifCompleted,
        setRerolltoTrue,
        setRerolltoFalse,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { useUser };
