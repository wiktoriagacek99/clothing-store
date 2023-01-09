export const SET_PRODUCTS = (state, products) => {
  state.products = products;
};

export const ADD_PRODUCT_TO_CART = (state, { product, quantity }) => {
  let productInCart = state.cart.find((item) => {
    return item.product.id === product.id;
  });

  if (productInCart) {
    productInCart.quantity += quantity;
    return;
  }
  state.cart.push({
    product,
    quantity,
  });
};

export const REMOVE_PRODUCT = (state, product) => {
  state.cart = state.cart.filter((item) => {
    return item.product.id !== product.id;
  });
};

export const SET_DATA = (state, data) => {
  state.data = data;
};
