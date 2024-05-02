// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSgpzISwcoA9O_QeGNd9zM-m_mZem2TIE",
  authDomain: "elexp-backup.firebaseapp.com",
  projectId: "elexp-backup",
  storageBucket: "elexp-backup.appspot.com",
  messagingSenderId: "316110478043",
  appId: "1:316110478043:web:11d76a130c4f2095fc0afe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

/*  apiKey: "AIzaSyBSgpzISwcoA9O_QeGNd9zM-m_mZem2TIE",
  authDomain: "elexp-backup.firebaseapp.com",
  projectId: "elexp-backup",
  storageBucket: "elexp-backup.appspot.com",
  messagingSenderId: "316110478043",
  appId: "1:316110478043:web:11d76a130c4f2095fc0afe"*/


  /*
   apiKey: "AIzaSyDpnUmB56wsBW8dcELxFvrUplk6q-Nv4PA",
  authDomain: "elexp-351d8.firebaseapp.com",
  projectId: "elexp-351d8",
  storageBucket: "elexp-351d8.appspot.com",
  messagingSenderId: "29160119501",
  appId: "1:29160119501:web:f9af1c0464b3e07a381d84" */