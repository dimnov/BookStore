import { createContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};

  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [productDetails, setProductDetails] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  // Fetch product details based on the ID
  const fetchProductDetails = async (itemId) => {
    const bookDoc = doc(db, "books", itemId);
    const docSnapshot = await getDoc(bookDoc);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setProductDetails((prev) => ({ ...prev, [itemId]: data }));
    }
  };

  useEffect(() => {
    // Fetch product details for each item in the cart
    Object.keys(cartItems).forEach((itemId) => {
      fetchProductDetails(itemId);
    });
  }, [cartItems]);

  const fetchAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    setAllProducts(products);
  };

  useEffect(() => {
    // Fetch all products when the component mounts
    fetchAllProducts();
  }, []);

  useEffect(() => {
    // Fetch product details for each item in the cart
    Object.keys(cartItems).forEach((itemId) => {
      fetchProductDetails(itemId);
    });
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const quantity = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: quantity };
    });

    // Fetch product details for the newly added item
    fetchProductDetails(itemId);
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

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = productDetails[itemId];
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
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
    productDetails,
    allProducts,
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
