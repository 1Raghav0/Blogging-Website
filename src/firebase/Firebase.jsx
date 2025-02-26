import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCfrEv9Np3ASiNdB0TsH0KGgmdeHsSi4Zo",
  authDomain: "blogging-website-63115.firebaseapp.com",
  projectId: "blogging-website-63115",
  storageBucket: "blogging-website-63115.firebasestorage.app",
  messagingSenderId: "367006680716",
  appId: "1:367006680716:web:ee5fd772911792ffe5dda9",
  measurementId: "G-QXK1YW846M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


