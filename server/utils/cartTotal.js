// Function to calculate total price of items in cart
export const calculateCartTotal = (cart) => {
  return cart.products.reduce((totalPrice, item) => {
    return totalPrice + item.product.price * item.quantity;
  }, 0);
};
