import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";
import { addNewUser } from "./userService.js";

export const signInWithEmailAndPasswordHandler = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogleHandler = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const registerWithEmailAndPasswordHandler = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await addNewUser(userCredential.user.uid, []);
  return userCredential;
};
