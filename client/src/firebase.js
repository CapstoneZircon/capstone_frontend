// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyAdecG1lXgCG72ve0kzsXnAUtsdVHc19m0",
  authDomain: "capstone-warehouse.firebaseapp.com",
  projectId: "capstone-warehouse",
  storageBucket: "capstone-warehouse.appspot.com",
  messagingSenderId: "991601461414",
  appId: "1:991601461414 :web :cc9b3337d8422a35dd0c67",
  measurementId: "G-GCGS47KZGV"
};

// Initialize Firebase
export const app_firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app_firebase);
export const auth = getAuth();
export const db_firestore = getFirestore(app_firebase);