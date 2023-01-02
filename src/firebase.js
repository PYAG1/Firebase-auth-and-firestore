// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBikY-fewgb1GDpApOfG0oV8rBrN6pVupo",
  authDomain: "ohwow-6e9c1.firebaseapp.com",
  projectId: "ohwow-6e9c1",
  storageBucket: "ohwow-6e9c1.appspot.com",
  messagingSenderId: "792210844461",
  appId: "1:792210844461:web:5c66f686da5cb2c00441a4",
  measurementId: "G-H8Z8NWY9X6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
const analytics = getAnalytics(app);