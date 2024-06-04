// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsJlEA3SYqjb2ijsyZNQKTsI9_q-IyQSQ",
    authDomain: "chat-app-collab.firebaseapp.com",
    projectId: "chat-app-collab",
    storageBucket: "chat-app-collab.appspot.com",
    messagingSenderId: "1091973585558",
    appId: "1:1091973585558:web:e13555b97ac701f3b980b7",
    measurementId: "G-P9DSW70NQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exports

export const db = getFirestore(app);
export const auth = getAuth(app);