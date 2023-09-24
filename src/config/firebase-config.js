// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9rxvbKLFjFw9zfV9L7jweYasCpKg8QMw",
  authDomain: "expense-manager-d81d4.firebaseapp.com",
  projectId: "expense-manager-d81d4",
  storageBucket: "expense-manager-d81d4.appspot.com",
  messagingSenderId: "539682431675",
  appId: "1:539682431675:web:78ba8478c4aa173665bf9e",
  measurementId: "G-2QSR3S2VDL"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
