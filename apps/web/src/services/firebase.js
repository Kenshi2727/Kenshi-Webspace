// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB28e5L12OJDRZrEANhp-R8K2NquslHWXw",
    authDomain: "kenshi-webspace-f1f76.firebaseapp.com",
    projectId: "kenshi-webspace-f1f76",
    storageBucket: "kenshi-webspace-f1f76.firebasestorage.app",
    messagingSenderId: "504947235562",
    appId: "1:504947235562:web:2b7c9b183d59dd9f749593",
    measurementId: "G-REED1BX0E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const messaging = getMessaging(app);