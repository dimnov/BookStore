import { createContext, useState } from "react";
// import all_product from "../components/Assets/all_product.js";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { redirect, useParams } from "react-router-dom";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};

  // for (let i = 0; i <= all_product.length; i++) {
  //   cart[i] = 0;
  // }

  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const deleteBook = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
  };

  const updateBookPrice = async (id, newPrice) => {
    const bookDoc = doc(db, "books", id);
    await updateDoc(bookDoc, { price: newPrice });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // let itemInfo = all_product.find(
        //   (product) => product.id === Number(item)
        // );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    // all_product,
    cartItems,
    addToCart,
    deleteBook,
    updateBookPrice,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
