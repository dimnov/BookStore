import { getDocs, collection, query, orderBy, limit, where, getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const getBooksList = async (itemsToShow) => {
  const booksCollectionRef = collection(db, "books");

  const booksQuery = query(
    booksCollectionRef,
    orderBy('name'),
    limit(itemsToShow)
  );

  try {
    const data = await getDocs(booksQuery);
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return filteredData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBookById = async (productId) => {
  const booksCollectionRef = collection(db, "books");
  const productDocRef = doc(booksCollectionRef, productId);

  try {
    const data = await getDoc(productDocRef);
    return data.data();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCategoriesList = async () => {
  const booksCollectionRef = collection(db, "books");

  try {
    if (booksCollectionRef) {
      const data = await getDocs(booksCollectionRef);
      const categoriesArray = [];

      data.docs.forEach((doc) => {
        const bookData = doc.data();
        if (bookData.category && !categoriesArray.includes(bookData.category)) {
          categoriesArray.push(bookData.category);
        }
      });

      return categoriesArray;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBooksByCategory = async (itemsToShow, orderCriteria) => {
  const booksCollectionRef = collection(db, "books");

  const booksQuery = query(
    booksCollectionRef,
    where("category", "==", orderCriteria),
    limit(itemsToShow)
  );

  try {
    const data = await getDocs(booksQuery);
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return filteredData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBookByName = async (bookName) => {
  const booksCollectionRef = collection(db, "books");

  const booksQuery = query(
    booksCollectionRef,
    where("name", "==", bookName),
  );

  try {
    const data = await getDocs(booksQuery);
    const book = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0];

    return book || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBooksCount = async () => {
  const collectionRef = collection(db, 'books');
  const querySnapshot = await getDocs(collectionRef);

  return querySnapshot.size;
};

export const deleteBook = async (id) => {
  const bookDoc = doc(db, "books", id);
  await deleteDoc(bookDoc);
}