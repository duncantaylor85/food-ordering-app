import Vue from "vue";
import Vuex from "vuex";
import isEmpty from "lodash.isempty";
import { productsCollection } from "../../components/firebaseInit";
import { deleteProduct } from "../../controllers/ProductsController";

Vue.use(Vuex);

const  state = () => ({
    products: Object.create(null)
  })

 const getters = {
    products(state){
      return state.products;
    }
  }

  const mutations = {
    SET_PRODUCTS(state, products){
      const productsArray = products.split(";");
      Vue.set(state.products, productsArray[0], JSON.parse(productsArray[1]));
    }
  }

  const actions = {
    fetchProducts({ commit }){
      productsCollection.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            commit('SET_PRODUCTS', doc.id + ";" + JSON.stringify(doc.data()))
        });
      });
    
   },
   addProduct ({commit}, payload) {
      const isProduct = payload.isProduct; 
      const newProduct = payload.newProduct;
      const selectedProduct = payload.selectedProduct;

      if (newProduct != "") {
        if (isProduct) {
          productsCollection
            .doc(newProduct)
            .set({subproducts: {}, price: 0})
            .then(() => {
              console.log("product added");
            })
            .catch(function(error) {
              console.log("Error adding product:", error);
            });
        } else {
          const subProductRef = productsCollection.doc(selectedProduct);
          subProductRef.get().then((doc) => {
            let subproducts = doc.data();
            if (!isEmpty(subproducts)) {
              subproducts.subproducts[newProduct] = {price: 0, description: ""};
            } else {
              subproducts = { subproducts: [newProduct] };
            }
            subProductRef
              .set(subproducts)
              .then(() => {
                console.log("subproduct added");
              })
              .catch(function(error) {
                console.log("Error adding subproduct:", error);
              });
          });
        }
      }
    },

    deleteProduct({commit}, payload){
      const isProduct = payload.isProduct; 
      const selectedProduct = payload.selectedProduct;
      if (isProduct) {
        const selectedProductRef = productsCollection.doc(selectedProduct);
        const subproducts = selectedProductRef.get();

        if (!isEmpty(subproducts)) {
          selectedProductRef.set({});
          console.log("deleted subproducts");
        }
        selectedProductRef
          .delete()
          .then(() => {
            console.log("product deleted");
          })
          .catch(function(error) {
            console.log("Error deleting product:", error);
          });
      } else {
        const prods = selectedProduct.split(";");
        const selectedProductRef = productsCollection.doc(prods[0]);

        selectedProductRef.get().then((doc) => {
          const subproducts = doc.data();
          delete subproducts.subproducts[prods[1]]        
          selectedProductRef.
            set(subproducts)
            .then(() => {
              console.log("subproduct deleted");
            })
            .catch(function(error) {
              console.log("Error deleting subproduct:", error);
            });
        });
      }
    }
  }
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
