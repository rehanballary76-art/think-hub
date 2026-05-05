import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBJZqtlvzjHnfBIudeeHeGRTvRyvwGkhA",
  authDomain: "think-hub-6ff6d.firebaseapp.com",
  projectId: "think-hub-6ff6d",
  storageBucket: "think-hub-6ff6d.firebasestorage.app",
  messagingSenderId: "428627615668",
  appId: "1:428627615668:web:2d77237966d81c6c11dce1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);