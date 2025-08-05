// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//  import.meta.env.VITE_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "okdone-f6606.firebaseapp.com",
  projectId: "okdone-f6606",
  storageBucket: "okdone-f6606.firebasestorage.app",
  messagingSenderId: "723729260797",
  appId: "1:723729260797:web:f0ceb8cbe524369f77de94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);