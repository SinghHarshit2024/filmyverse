import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1WOssFBm7bDEFN0Aef6mazdwmiShszeI",
  authDomain: "filmyverse-e0144.firebaseapp.com",
  projectId: "filmyverse-e0144",
  storageBucket: "filmyverse-e0144.appspot.com",
  messagingSenderId: "1072564458621",
  appId: "1:1072564458621:web:e4192bddc5ab3bb4e94d14",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db,"usersRef")
export default app;
