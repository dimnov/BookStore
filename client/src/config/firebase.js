import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqmsTDBozDwOZzDCVwmkS2sk5Ko_2XYwU",
  authDomain: "manifest-access-334509.firebaseapp.com",
  projectId: "manifest-access-334509",
  storageBucket: "manifest-access-334509.appspot.com",
  messagingSenderId: "155135647744",
  appId: "1:155135647744:web:8c46f1b94ba5df5fc0b8e5",
  measurementId: "G-9KW4CHFBDX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);