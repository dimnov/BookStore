import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const addNewUser = async (uid, favoriteBooks) => {
  const userRef = doc(collection(db, "users"), uid);
  await setDoc(userRef, {
    uid,
    favoriteBooks,
  });
};
