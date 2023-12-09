export default function CommentItem({
  comment,
  currentUser,
  handleEdit,
  handleDelete,
}) {
  return (
    <div>
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
          <button className="del-btn" onClick={() => handleDelete(comment.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
