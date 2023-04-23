// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = import.meta.env.VITE_FIREBASE_API;
const firebaseConfig = {
  apiKey,
  authDomain: "weather-tsx.firebaseapp.com",
  projectId: "weather-tsx",
  databaseURL:
    "https://weather-tsx-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "weather-tsx.appspot.com",
  messagingSenderId: "324692439470",
  appId: "1:324692439470:web:a04eeed6fbdb68711ed83f",
  measurementId: "G-PP1SJ75Z3W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export const auth = getAuth(app);
// const analytics = getAnalytics(app);
