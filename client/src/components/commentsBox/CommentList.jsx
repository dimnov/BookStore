import CommentItem from "./CommentItem.jsx";

export default function CommentsList({
  comments,
  currentUser,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="commentsbox-comments">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
