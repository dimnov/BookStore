import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.js";
import { signOut } from "firebase/auth";

export const addNewUser = async (uid, favoriteBooks) => {
  const userRef = doc(collection(db, "users"), uid);
  await setDoc(userRef, {
    uid,
    favoriteBooks,
  });
};

export const userSignOut = async () => {
  await signOut(auth);
}