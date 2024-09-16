// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revents-d376d.firebaseapp.com",
  databaseURL: "https://revents-d376d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "revents-d376d",
  storageBucket: "revents-d376d.appspot.com",
  messagingSenderId: "926847986755",
  appId: "1:926847986755:web:8bfea247fb570bbedaf8f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);