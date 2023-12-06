import "./ProductDisplay.css";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import { adminKey } from "../../config/adminKey.js";
import { useNavigate } from "react-router-dom";
// import { auth, db, addDoc, doc, collection } from "firebase/firestore";

// import { db, auth } from "../../config/firebase.js";
// import { addDoc, doc } from "firebase/firestore";

export default function ProductDisplay(props) {
  const { product, id } = props;
  const { addToCart, deleteBook } = useContext(ShopContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteBookHandler = async (id) => {
    await deleteBook(id);
    navigate("/shop");
  };

  // const editBookHandler = async (id) => {
  //   await editBook(id);
  // };

  // const addToFavoritesHandler = async () => {
  //   if (!currentUser) {
  //     // console.log("User not logged in");
  //     return;
  //   }
  //   const userDocRef = doc(db, "users", currentUser.uid);

  //   // Use addDoc to add the book ID to the 'favoriteBooks' array
  //   await addDoc(collection(userDocRef, "favoriteBooks"), { bookId: id });

  //   console.log("Book added to favorites");
  // };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="book image" />
          <img src={product.image} alt="book image" />
          <img src={product.image} alt="book image" />
          <img src={product.image} alt="book image" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">${product.price}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="buttons-section">
          <button
            className="add-to-cart"
            onClick={() => {
              addToCart(id);
            }}
          >
            ADD TO CART
          </button>
          {currentUser ? (
            <button
              className="add-to-favourite"
              // onClick={() => addToFavoritesHandler()}
            >
              Add to favourite
            </button>
          ) : null}

          {currentUser?.uid === adminKey ? (
            <>
              <button
                className="edit-book"
                // onClick={() => {
                // editBookHandler(id);
                // }}
              >
                Edit
              </button>
              <button
                className="delete-book"
                onClick={() => {
                  deleteBookHandler(id);
                }}
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
