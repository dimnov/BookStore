import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import "./Cart.css";
import CartTotal from "./CartTotal.jsx";
import CartItemsList from "./CartItemsList.jsx";

export default function Cart() {
  const { getTotalCartAmount, cartItems, removeFromCart, allProducts } =
    useContext(ShopContext);

  const calculateShippingFee = (subtotal) => {
    return subtotal > 0 && subtotal < 50 ? 5 : 0;
  };

  const subtotal = getTotalCartAmount();
  const shippingFee = calculateShippingFee(subtotal);

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

      <CartItemsList
        allProducts={allProducts}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
      <CartTotal
        subtotal={subtotal}
        shippingFee={shippingFee}
        totalAmount={totalAmount}
      />
    </div>
  );
}
