// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "warehousezircon.firebaseapp.com",
  projectId: "warehousezircon",
  storageBucket: "warehousezircon.appspot.com",
  messagingSenderId: "80256510318",
  appId: "1:80256510318:web:893c1ff0c85ff96589797f",
  measurementId: "G-69JWN7GLHD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);