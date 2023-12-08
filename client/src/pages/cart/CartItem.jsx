import { Link } from "react-router-dom";
import remove_icon from "../../Assets/cart_cross_icon.png";

const CartItem = ({ product, quantity, removeFromCart }) => (
  <div key={product.id}>
    <div className="cartitems-format cartitems-format-main">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt="" className="carticon-product-icon" />
      </Link>
      <p>{product.name}</p>
      <p>${product.price}</p>
      <p className="cartitems-quantity">{quantity}</p>
      <p>${(product.price * quantity).toFixed(2)}</p>
      <img
        className="cartitems-remove-icon"
        src={remove_icon}
        onClick={() => {
          removeFromCart(product.id);
        }}
        alt="remove"
      />
    </div>
    <hr />
  </div>
);

export default CartItem;
