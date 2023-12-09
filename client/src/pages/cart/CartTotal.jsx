export default function CartTotal({
  subtotal,
  shippingFee,
  totalAmount,
  onCheckoutHandler,
}) {
  return (
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
        <button className="checkout-btn" onClick={() => onCheckoutHandler()}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
}
