import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDM-ZZoGumYL519LvYh0Siw7ZLk8jOEHg",
  authDomain: "groovetunes-940db.firebaseapp.com",
  projectId: "groovetunes-940db",
  storageBucket: "groovetunes-940db.appspot.com",
  messagingSenderId: "67568873789",
  appId: "1:67568873789:web:e321105e4877b20efc5554",
  measurementId: "G-YP4XTQEJ9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to localStorage
setPersistence(auth, browserLocalPersistence);

// Authentication functions
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { app, auth, db, loginUser, registerUser, logoutUser, onAuthStateChangedListener };
