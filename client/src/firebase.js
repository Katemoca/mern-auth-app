// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-dbb0d.firebaseapp.com",
  projectId: "mern-auth-dbb0d",
  storageBucket: "mern-auth-dbb0d.appspot.com",
  messagingSenderId: "93213737260",
  appId: "1:93213737260:web:792b745693425a5a336c89",
};
// console.log(import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
