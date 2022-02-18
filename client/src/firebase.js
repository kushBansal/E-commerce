import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn10iHU2TvkOau02hU3WPH2WN9hlTwJA8",
  authDomain: "ecommerce-45d4e.firebaseapp.com",
  projectId: "ecommerce-45d4e",
  storageBucket: "ecommerce-45d4e.appspot.com",
  messagingSenderId: "193301947820",
  appId: "1:193301947820:web:fafb7f575a9c5597c30609"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const authentication=auth();
export const auth=getAuth();
