import { mapState } from 'vuex';
import store from '../store/index';

const deleteProduct = async (isProduct, selectedProduct) => {
    if (isProduct) {
        const selectedProductRef = productsCollection.doc(selectedProduct);
        const subproducts = await selectedProductRef.get();

        if (!isEmpty(subproducts)) {
          console.log("deleted subproducts");
          selectedProductRef.set({});
        }
        selectedProductRef
          .delete()
          .then(() => {
            console.log("product deleted");
            this.closeDialog(this.deleteDialog);
          })
          .catch(function(error) {
            console.log("Error deleting product:", error);
          });
      } else {
        const prods = selectedProduct.split(";");
        const selectedProductRef = productsCollection.doc(prods[0]);

        selectedProductRef.get().then((doc) => {
          const subproducts = doc.data();
          const newSubproducts = doc
            .data()
            .subproducts.filter((item) => item != prods[1]);
          selectedProductRef
            .set({
              subproducts: newSubproducts,
            })
            .then(() => {
              console.log("subproduct deleted");
              this.closeDialog(this.deleteDialog);
            })
            .catch(function(error) {
              console.log("Error deleting subproduct:", error);
            });
        });
      }
}

const addProduct = (isProduct, newProduct, selectedProduct) => {
    if (newProduct != "") {
        if (isProduct) {
          productsCollection
            .doc(this.newProduct)
            .set({})
            .then(() => {
              console.log("product added");
              this.closeDialog(this.addDialog);
            })
            .catch(function(error) {
              console.log("Error adding product:", error);
            })
            .finally(() => {
              newProduct = "";
            });
        } else {
          const subProductRef = productsCollection.doc(selectedProduct);
          const products = subProductRef.get().then((doc) => {
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
                this.closeDialog(this.addDialog);
              })
              .catch(function(error) {
                console.log("Error adding subproduct:", error);
              })
              .finally(() => {
                newProduct = "";
              });
          });
        }
      }
    }

const fetchProducts = async function () {
  console.log("fetch");
   return await store.dispatch("products/getProducts");
}

const getProducts = async function () {
  console.log("get");
  return await store.products.products;
  
}

export  {fetchProducts, getProducts, addProduct, deleteProduct};