// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj-J7Nn5hVtXFb5K6N8mXm8tEtHYBlX4I",
  authDomain: "joint-club.firebaseapp.com",
  databaseURL: "https://joint-club.firebaseio.com",
  projectId: "joint-club",
  storageBucket: "joint-club.appspot.com",
  messagingSenderId: "461274266884",
  appId: "1:461274266884:web:4e91173f4021f4d2c6e451",
  measurementId: "G-CTC5NYJN10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app; // Export the Firebase app instance
