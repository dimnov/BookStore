import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase.js";

export const getProductDetails = async (productId) => {
  const bookDoc = doc(db, "books", productId);
  const docSnapshot = await getDoc(bookDoc);

  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    return data;
  }
}

export const getAllProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "books"));
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return products;
}

export const addProduct = async (newBook) => {
  const booksCollectionRef = collection(db, "books");
  await addDoc(booksCollectionRef, {
    ...newBook,
    userId: auth?.currentUser?.uid,
  });
}