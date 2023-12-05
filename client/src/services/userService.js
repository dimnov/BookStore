import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const addNewUser = async (uid, email, favoriteBooks, roles) => {
  const userRef = collection(db, "users");
  await addDoc(userRef, {
    uid,
    email,
    favoriteBooks,
    roles,
  });
};
