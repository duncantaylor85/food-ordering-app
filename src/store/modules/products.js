import Vue from "vue";
import Vuex from "vuex";
import isEmpty from "lodash.isempty";
import { productsCollection } from "../../components/firebaseInit";

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
      Vue.set(state.products, productsArray[0], productsArray[1]);
    }
  }

  const actions = {
    getProducts({ commit }){
      productsCollection.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            commit('SET_PRODUCTS', doc.id + ";" + doc.data().subproducts)
  
        });
    });

    },
    addProduct ({ state, commit }, payload) {
      // TODO: commit state
      console.log("mapAction add product", payload);
      const isProduct = payload.isProduct; 
      const newProduct = payload.newProduct;
      const selectedProduct = payload.selectedProduct;

      if (newProduct != "") {
        if (isProduct) {
          productsCollection
            .doc(newProduct)
            .set({})
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
              subproducts.subproducts.push(newProduct);
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
    }

  }
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
