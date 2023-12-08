import { useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { AuthContext } from "../../context/AuthProvider.jsx";
import "./CommentsBox.css";

export default function CommentsBox({ bookId }) {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [error, setError] = useState();

  const fetchComments = async () => {
    try {
      const commentsCollectionRef = collection(db, "books", bookId, "comments");
      const commentsQuery = query(commentsCollectionRef, orderBy("timestamp"));
      const querySnapshot = await getDocs(commentsQuery);

      const commentsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      setError("Comment cannot be empty.");
      return;
    }

    const commentsCollectionRef = collection(db, "books", bookId, "comments");

    try {
      if (editingCommentId) {
        const commentDocRef = doc(commentsCollectionRef, editingCommentId);
        await updateDoc(commentDocRef, { comment, timestamp: new Date() });
        setEditingCommentId(null);
      } else {
        await addDoc(commentsCollectionRef, {
          user: currentUser ? currentUser.email : "",
          comment,
          timestamp: new Date(),
        });
      }

      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding/editing comment: ", error);
    }
  };

  const handleEdit = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setComment(commentText);
  };

  const handleDelete = async (commentId) => {
    try {
      const commentDocRef = doc(db, "books", bookId, "comments", commentId);
      await deleteDoc(commentDocRef);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [bookId]);

  return (
    <div className="commentsbox">
      <div className="commentsbox-navigator">
        <div className="commentsbox-nav-box">Comments</div>
      </div>
      <div className="commentsbox-comments">
        {comments.map((comment) => (
          <div key={comment.id}>
            <h4>{comment.user}</h4>
            <p>{comment.comment}</p>
            {currentUser && currentUser.email === comment.user && (
              <div>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(comment.id, comment.comment)}
                >
                  Edit
                </button>
                <button
                  className="del-btn"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {currentUser ? (
          <>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <span>{error}</span>
            <button type="submit">
              {editingCommentId ? "Edit Comment" : "Add Comment"}
            </button>
          </>
        ) : null}
      </form>
    </div>
  );
}
