import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./CommentsBox.css";
import {
  addComment,
  deleteComment,
  editComment,
  getCommentsByBookId,
} from "../../services/commentService.js";
import CommentsList from "./CommentList.jsx";
import CommentForm from "./CommentForm.jsx";

export default function CommentsBox({ bookId }) {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [error, setError] = useState();

  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsByBookId(bookId);
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
  };

  const addOrUpdateComment = async () => {
    try {
      if (editingCommentId) {
        await editComment(bookId, editingCommentId, comment);
        setEditingCommentId(null);
      } else {
        await addComment(bookId, currentUser, comment);
      }

      setComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding/editing comment: ", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(bookId, commentId);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      await addOrUpdateComment();
    } catch (error) {
      console.error("Error adding/editing comment: ", error);
    }
  };

  const handleEdit = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setComment(commentText);
  };

  return (
    <div className="commentsbox">
      <div className="commentsbox-navigator">
        <div className="commentsbox-nav-box">Comments</div>
      </div>
      <CommentsList
        comments={comments}
        currentUser={currentUser}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {currentUser ? (
        <CommentForm
          comment={comment}
          setComment={setComment}
          error={error}
          handleSubmit={handleSubmit}
          editingCommentId={editingCommentId}
        />
      ) : null}
    </div>
  );
}
