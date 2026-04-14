// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv7OtegQBqoZcty-KLSboXIKZfqY0HVps",
  authDomain: "netmirrorgpt-8998a.firebaseapp.com",
  projectId: "netmirrorgpt-8998a",
  storageBucket: "netmirrorgpt-8998a.firebasestorage.app",
  messagingSenderId: "708750534459",
  appId: "1:708750534459:web:f2e760eea12d450a6d391e",
  measurementId: "G-2NELBZ25YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();