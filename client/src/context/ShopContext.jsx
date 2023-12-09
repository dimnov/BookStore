import { createContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [productDetails, setProductDetails] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  const fetchProductDetails = async (itemId) => {
    const bookDoc = doc(db, "books", itemId);
    const docSnapshot = await getDoc(bookDoc);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setProductDetails((prev) => ({ ...prev, [itemId]: data }));
    }
  };

  const fetchAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllProducts(products);
  };

  useEffect(() => {
    Object.keys(cartItems).forEach(async (itemId) => {
      fetchProductDetails(itemId);
    });
    fetchAllProducts();
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const quantity = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: quantity };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, itemId) => {
      const itemInfo = productDetails[itemId];
      if (itemInfo && cartItems[itemId] > 0) {
        return totalAmount + itemInfo.price * cartItems[itemId];
      }
      return totalAmount;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (totalItem, count) => totalItem + count,
      0
    );
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    addToCart,
    removeFromCart,
    productDetails,
    allProducts,
    cartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
