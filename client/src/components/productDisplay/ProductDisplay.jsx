import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import "./ProductDisplay.css";

export default function ProductDisplay(props) {
  const { product, id } = props;
  const { addToCart, deleteBook, updateBookPrice } = useContext(ShopContext);

  // const [newPrice, setNewPrice] = useState(0);

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
        <div>
          <button
            onClick={() => {
              addToCart(id);
            }}
          >
            ADD TO CART
          </button>
          {/* <button
            onClick={() => {
              // loader();
              deleteBook(id);
            }}
          >
            Delete
          </button>

          <input
            placeholder="new price"
            onChange={(e) => setNewPrice(Number(e.target.value))}
          />
          <button
            onClick={() => {
              updateBookPrice(id, newPrice);
            }}
          >
            Update Price
          </button> */}
        </div>
        <div className="productdisplay-category-tags">
          <p className="productdisplay-right-category">
            <span>Category: </span>
            {product.category}
          </p>
          {/* <p className="productdisplay-right-category">
            <span>Tags: </span>Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Non, molestiae.
          </p> */}
        </div>
      </div>
    </div>
  );
}
