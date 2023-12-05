import "./CommentsBox.css";

export default function CommentsBox() {
  return (
    <div className="commentsbox">
      <div className="commentsbox-navigator">
        <div className="commentsbox-nav-box">Comments</div>
      </div>
      <div className="commentsbox-comments">
        <div>
          <h4>User 1</h4>
          <p>comment 1</p>
        </div>
        <div>
          <h4>User 2</h4>
          <p>comment 2</p>
        </div>
        <div>
          <h4>User 3</h4>
          <p>comment 4</p>
        </div>
      </div>
    </div>
  );
}
