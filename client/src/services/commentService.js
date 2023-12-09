import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const getCommentsByBookId = async (bookId) => {
  const commentsCollectionRef = collection(db, "books", bookId, "comments");
  const commentsQuery = query(commentsCollectionRef, orderBy("timestamp"));
  const querySnapshot = await getDocs(commentsQuery);

  const commentsData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return commentsData;
}

export const addComment = async (bookId, currentUser, comment) => {
  const commentsCollectionRef = collection(db, "books", bookId, "comments");

  await addDoc(commentsCollectionRef, {
    user: currentUser ? currentUser.email : "",
    comment,
    timestamp: new Date(),
  });
}

export const deleteComment = async (bookId, commentId) => {
  const commentDocRef = doc(db, "books", bookId, "comments", commentId);
  await deleteDoc(commentDocRef);
}

export const editComment = async (bookId, editingCommentId, comment) => {
  const commentsCollectionRef = collection(db, "books", bookId, "comments");

  const commentDocRef = doc(commentsCollectionRef, editingCommentId);
  await updateDoc(commentDocRef, { comment, timestamp: new Date() });
}