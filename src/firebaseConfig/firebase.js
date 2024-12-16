// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr5nkQnqUE4MFV9qXBaODQCMsyR12JzEY",
  authDomain: "crud-react-app-13032.firebaseapp.com",
  projectId: "crud-react-app-13032",
  storageBucket: "crud-react-app-13032.firebasestorage.app",
  messagingSenderId: "74920748086",
  appId: "1:74920748086:web:fc08d4926a88f83d47a497",
  measurementId: "G-XNF4DNCPHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);