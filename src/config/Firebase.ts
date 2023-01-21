// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTpaC8I_cCAJHCCKGT_W1PQWGEjk4gMEc",
    authDomain: "blog-website-99573.firebaseapp.com",
    projectId: "blog-website-99573",
    storageBucket: "blog-website-99573.appspot.com",
    messagingSenderId: "77013792848",
    appId: "1:77013792848:web:72137977f43a2a7a607955"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);