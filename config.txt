// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4cxUpS54adoq7FJycfNeQMZXbOWph714",
  authDomain: "hagmr-proyecto-backfront.firebaseapp.com",
  projectId: "hagmr-proyecto-backfront",
  storageBucket: "hagmr-proyecto-backfront.appspot.com",
  messagingSenderId: "1007517767506",
  appId: "1:1007517767506:web:5732a730e0f3aa0dc34c8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firebase.firestore()
const User = db.collection('Users')

module.exports = User