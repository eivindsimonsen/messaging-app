// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSnskVeEw_fFhr_tmc2_HkKL98ikAYHGM",
  authDomain: "message-app-4483d.firebaseapp.com",
  projectId: "message-app-4483d",
  storageBucket: "message-app-4483d.appspot.com",
  messagingSenderId: "522160302564",
  appId: "1:522160302564:web:9f6685ed030d5258febff1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

