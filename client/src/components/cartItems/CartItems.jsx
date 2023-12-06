import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext.jsx";
import remove_icon from "../../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

export default function CartItems() {
  const { getTotalCartAmount, cartItems, removeFromCart, allProducts } =
    useContext(ShopContext);

  // Function to calculate shipping fee based on subtotal
  const calculateShippingFee = (subtotal) => {
    return subtotal >= 50 ? 0 : 5;
  };

  // Calculate the subtotal and shipping fee
  const subtotal = getTotalCartAmount();
  const shippingFee = calculateShippingFee(subtotal);

  // Calculate the total amount
  const totalAmount = subtotal + shippingFee;

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {allProducts.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <Link to={`/product/${e.id}`}>
                  <img src={e.image} alt="" className="carticon-product-icon" />
                </Link>
                <p>{e.name}</p>
                <p>${e.price}</p>
                <p className="cartitems-quantity">{cartItems[e.id]}</p>
                <p>${(e.price * cartItems[e.id]).toFixed(2)}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt="remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart total:</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Free"}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalAmount.toFixed(2)}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
