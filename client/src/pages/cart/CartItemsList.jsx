import CartItem from "./CartItem.jsx";

export default function CartItemsList({
  allProducts,
  cartItems,
  removeFromCart,
}) {
  return (
    <>
      {allProducts.map((product) => {
        const quantity = cartItems[product.id];
        if (quantity > 0) {
          return (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
              removeFromCart={removeFromCart}
            />
          );
        }
        return null;
      })}
    </>
  );
}
