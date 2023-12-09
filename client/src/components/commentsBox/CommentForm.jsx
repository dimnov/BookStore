export default function CommentForm({
  comment,
  setComment,
  error,
  handleSubmit,
  editingCommentId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
      <span>{error}</span>
      <button type="submit">
        {editingCommentId ? "Edit Comment" : "Add Comment"}
      </button>
    </form>
  );
}
