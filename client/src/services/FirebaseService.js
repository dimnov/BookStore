import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.js";

// Function to get the document count in a collection
export const getDocumentCount = async () => {
  const collectionRef = collection(db, 'books');
  const querySnapshot = await getDocs(collectionRef);

  return querySnapshot.size;
};