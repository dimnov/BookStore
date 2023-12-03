import { getDocs, collection, query, orderBy, limit, where } from "firebase/firestore";
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