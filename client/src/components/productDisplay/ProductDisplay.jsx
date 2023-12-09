import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { adminKey } from "../../config/adminKey.js";
import { deleteBook } from "../../services/bookService.js";
import {
  addToFavorites,
  checkIfInFavorites,
  removeFromFavorites,
} from "../../services/favoriteService.js";

import ProductInfo from "./ProductInfo.jsx";
import ProductButtons from "../productButtons/ProductButtons.jsx";
import ProductImages from "./ProductImages.jsx";
import "./ProductDisplay.css";

export default function ProductDisplay(props) {
  const navigate = useNavigate();
  const { product, id } = props;
  const { addToCart } = useContext(ShopContext);
  const { currentUser } = useContext(AuthContext);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const deleteBookHandler = async (id) => {
    await deleteBook(id);
    navigate("/shop");
  };

  const addToFavoriteHandler = async () => {
    if (currentUser?.uid) {
      await addToFavorites(currentUser.uid, product, id);
    }
  };

  const removeFromFavoriteHandler = async () => {
    if (currentUser?.uid) {
      await removeFromFavorites(currentUser.uid, id);
    }
  };

  const handleToggleFavorite = async () => {
    if (!currentUser) {
      return;
    }

    if (isInFavorites) {
      await removeFromFavoriteHandler();
    } else {
      await addToFavoriteHandler();
    }

    setIsInFavorites(!isInFavorites);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser?.uid) {
        const isInFavorites = await checkIfInFavorites(currentUser.uid, id);
        setIsInFavorites(isInFavorites);
      }
    };

    fetchFavorites();
  }, [id, currentUser?.uid]);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <ProductImages
          images={[product.image, product.image, product.image, product.image]}
        />
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt="book-cover"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <ProductInfo product={product} />
        <ProductButtons
          currentUser={currentUser}
          isInFavorites={isInFavorites}
          handleToggleFavorite={handleToggleFavorite}
          addToCart={() => addToCart(id)}
          isAdmin={currentUser?.uid === adminKey}
          deleteBookHandler={() => deleteBookHandler(id)}
        />
      </div>
    </div>
  );
}
