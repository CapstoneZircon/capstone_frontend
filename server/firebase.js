// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require('firebase/auth');
const { getFirestore} = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "",
  authDomain: "capstone-warehouse.firebaseapp.com",
  projectId: "capstone-warehouse",
  storageBucket: "capstone-warehouse.appspot.com",
  messagingSenderId: "991601461414",
  appId: "1:991601461414 :web :cc9b3337d8422a35dd0c67",
  measurementId: "G-GCGS47KZGV"
};

// Initialize Firebase
// Initialize Firebase
const app_firebase = initializeApp(firebaseConfig);
const auth = getAuth(app_firestore);
const db_firestore = getFirestore(app_firestore);

module.exports = { app_firestore, auth, db_firestore };