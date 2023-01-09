export const itemsCount = (state) => {
  let quantity = 0;

  state.cart.forEach((item) => {
    quantity += item.quantity;
  });
  return quantity;
};

export const totalPrice = (state) => {
  let total = 0;

  state.cart.forEach((item) => {
    total += parseFloat(item.product.price.slice(1, -1)) * item.quantity;
  });

  return total;
};
