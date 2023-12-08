export default function ProductButtons({
  currentUser,
  isInFavorites,
  handleToggleFavorite,
  addToCart,
  isAdmin,
  deleteBookHandler,
}) {
  return (
    <div className="buttons-section">
      <button
        className="add-to-cart"
        onClick={() => {
          addToCart();
        }}
      >
        ADD TO CART
      </button>
      {currentUser ? (
        <button className="add-to-favourite" onClick={handleToggleFavorite}>
          {isInFavorites ? "REMOVE" : "ADD TO FAVORITE"}
        </button>
      ) : null}
      {isAdmin ? (
        <button
          className="delete-book"
          onClick={() => {
            deleteBookHandler();
          }}
        >
          DELETE
        </button>
      ) : null}
    </div>
  );
}
