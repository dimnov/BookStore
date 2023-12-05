import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const getDocumentCount = async () => {
  const collectionRef = collection(db, 'books');
  const querySnapshot = await getDocs(collectionRef);

  return querySnapshot.size;
};