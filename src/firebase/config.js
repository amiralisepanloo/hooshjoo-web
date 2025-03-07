// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwddSpgdupPG5peTVXhRKmJY8Agr2r2iQ",
  authDomain: "hooshjoo-2025.firebaseapp.com",
  projectId: "hooshjoo-2025",
  storageBucket: "hooshjoo-2025.firebasestorage.app",
  messagingSenderId: "1096618492994",
  appId: "1:1096618492994:web:323ea958be32695f6399db",
  measurementId: "G-JF2QXYQG6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// Export the Firebase services
export { app, analytics, auth, firestore, storage };
