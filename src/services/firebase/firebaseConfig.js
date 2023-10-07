// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOiKzFNZWh5n4YLOhc5MZ3AUsBtzOHxZ8",
  authDomain: "ecommerce-react-coder-660a3.firebaseapp.com",
  projectId: "ecommerce-react-coder-660a3",
  storageBucket: "ecommerce-react-coder-660a3.appspot.com",
  messagingSenderId: "781707503049",
  appId: "1:781707503049:web:705ac5a546b2e1ae84b418",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
