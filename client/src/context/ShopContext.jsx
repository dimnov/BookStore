import { createContext, useEffect, useState } from "react";
import {
  getAllProducts,
  getProductDetails,
} from "../services/productService.js";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [productDetails, setProductDetails] = useState({});
  const [allProducts, setAllProducts] = useState([]);

  const fetchProductDetails = async (productId) => {
    const productData = await getProductDetails(productId);
    setProductDetails((prev) => ({ ...prev, [productId]: productData }));
  };

  const fetchAllProducts = async () => {
    const products = await getAllProducts();
    setAllProducts(products);
  };

  useEffect(() => {
    Object.keys(cartItems).forEach(async (productId) => {
      fetchProductDetails(productId);
    });
    fetchAllProducts();
  }, [cartItems]);

  const addToCart = (productId) => {
    setCartItems((prev) => {
      const quantity = prev[productId] ? prev[productId] + 1 : 1;
      return { ...prev, [productId]: quantity };
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, productId) => {
      const itemInfo = productDetails[productId];
      if (itemInfo && cartItems[productId] > 0) {
        return totalAmount + itemInfo.price * cartItems[productId];
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
