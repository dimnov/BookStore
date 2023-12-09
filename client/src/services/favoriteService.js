import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const addToFavorites = async (userId, product, id) => {
  const userRef = doc(collection(db, "users"), userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();
  const productWithId = {
    ...product,
    id: id,
  };

  const updatedFavoriteBooks = [...userData?.favoriteBooks, productWithId];

  await updateDoc(userRef, {
    favoriteBooks: updatedFavoriteBooks,
  });
};

export const removeFromFavorites = async (userId, bookId) => {
  const userRef = doc(collection(db, "users"), userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  const updatedFavoriteBooks = userData.favoriteBooks.filter(
    (book) => book.id !== bookId
  );

  await updateDoc(userRef, {
    favoriteBooks: updatedFavoriteBooks,
  });
};

export const checkIfInFavorites = async (userId, bookId) => {
  const userRef = doc(collection(db, "users"), userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  return userData?.favoriteBooks.some((book) => book.id === bookId);
};

export const getUserFavoriteBooks = async (currentUser) => {
  const userRef = doc(collection(db, "users"), currentUser);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  return userData.favoriteBooks;
}