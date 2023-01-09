import axios from "axios";

export const getProducts = async ({ commit }) => {
  const response = await axios.get(
    "http://www.mocky.io/v2/5ab0d1882e0000e60ae8b7a6"
  );
  commit("SET_PRODUCTS", response.data);
};

export const addProductToCart = ({ commit }, { product, quantity }) => {
  commit("ADD_PRODUCT_TO_CART", { product, quantity });
};

export const removeProduct = ({ commit }, product) => {
  commit("REMOVE_PRODUCT", product);
};

export const setData = ({ commit }, data) => {
  commit("SET_DATA", data);
};
