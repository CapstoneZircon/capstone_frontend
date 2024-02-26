// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require('firebase/auth');
const { getFirestore} = require('firebase/firestore');

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
// Initialize Firebase
const app_firebase = initializeApp(firebaseConfig);
const auth = getAuth(app_firebase);
const db_firestore = getFirestore(app_firebase);

module.exports = { app_firebase, auth, db_firestore };