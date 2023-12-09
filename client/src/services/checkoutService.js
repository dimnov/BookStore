import { loadStripe } from '@stripe/stripe-js';

export const onCheckout = async (itemsInCart) => {
  try {
    const response = await fetch('http://localhost:4242/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: itemsInCart
      }),
    });

    if (!response.ok) {
      console.error('Failed to checkout:', response.statusText);
      return;
    }

    const { id } = await response.json();
    const stripe = await loadStripe('pk_test_51NaNgtKbiChAb1IQN6qtOhbYSlocpdrL5l62UOoMz93drGxWB27YJsNdlD94TGoRwFmssXxMEFYnlmZAiUpSb07h00uI33KadM');

    stripe?.redirectToCheckout({
      sessionId: id,
    });
  } catch (error) {
    console.error('An error occurred during checkout:', error);
  }
};

export const checkoutItems = async (cartItems, allProducts) => {
  const itemsInCart = allProducts.map((product) => {
    const quantity = cartItems[product.id];
    if (quantity > 0) {
      return {
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
      };
    }
  });

  const filteredItemsInCart = itemsInCart.filter(
    (item) => item !== undefined || null
  );

  if (filteredItemsInCart.length > 0) {
    return filteredItemsInCart;
  }
}