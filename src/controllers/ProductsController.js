import store from '../store/index';

const deleteProduct = async (isProduct, selectedProduct) => {
  return await store.dispatch('products/deleteProduct', {isProduct, selectedProduct});
}

const addProduct = async (isProduct, newProduct, selectedProduct) => {
  return await store.dispatch("products/addProduct", {isProduct, newProduct, selectedProduct});
}

const fetchProducts = async function () {
   return await store.dispatch("products/fetchProducts");
}
const getProducts = function() {
  return store.getters['products/products'];
}

export  {fetchProducts, getProducts, addProduct, deleteProduct};