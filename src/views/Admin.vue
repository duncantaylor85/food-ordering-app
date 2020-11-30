<template>
  <div id="admin" text-center>
    <h1>{{ $t("adminPageTitle") }}</h1>
    <br />
    <h3>{{ $t("productsListTitle") }}</h3>
    <v-card
      id="products"
      class="mx-auto mt-2"
      v-for="(product, index) in products"
      :key="index"
      max-width="700"
      color="#FFFFFF"
    >
      <div class="d-flex">
        <v-card-text>{{ product }}</v-card-text>
        <v-card-actions>
          <v-btn
            icon
            @click="
              isProduct = false;
              displayDialog(addDialog, product);
            "
            ><v-icon>mdi-plus</v-icon></v-btn
          >
          <v-btn
            icon
            @click="
              isProduct = true;
              displayDialog(deleteDialog, product);
            "
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
        </v-card-actions>
      </div>

      <div
        v-for="(subproduct, i) in subproducts[index].subproducts"
        :key="i"
        link
        style="padding-left: 30px;padding-right: 100px;"
      >
        <div class="d-flex">
          <v-btn
            style="top: 10px;"
            icon
            @click="
              isProduct = false;
              displayDialog(deleteDialog, product + ';' + subproduct);
            "
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
          <v-card-text v-text="subproduct"></v-card-text>
        </div>
      </div>
    </v-card>
    <v-btn
      color="primary"
      dark
      absolute
      bottom
      right
      fab
      @click="
        isProduct = true;
        displayDialog(addDialog);
      "
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="showAddDialog" width="600">
      <v-card>
        <v-card-title>
          {{ $t("addProductTitle") }}
        </v-card-title>
        <v-card-text>
          {{ $t("addProductMessage") }}
          <v-text-field
            :label="$t('productLabel')"
            v-model="newProduct"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog(addDialog)">
            {{ $t("cancelButtonLabel") }}
          </v-btn>
          <v-btn color="primary" text @click="addProduct">
            {{ $t("confirmButtonLabel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDeleteDialog" width="600">
      <v-card>
        <v-card-title>
          {{ $t("deleteProductTitle") }}
        </v-card-title>
        <v-card-text>
          {{ $t("deleteProductMessage") }}
          <br />
          {{ selectedProduct }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog(deleteDialog)">
            {{ $t("cancelButtonLabel") }}
          </v-btn>
          <v-btn color="primary" text @click="deleteProduct">
            {{ $t("confirmButtonLabel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "../components/firebaseInit";
var isEmpty = require("lodash.isempty");

export default {
  name: "Admin",
  data() {
    return {
      products: [],
      subproducts: [],
      selectedProduct: "",
      showAddDialog: false,
      showDeleteDialog: false,
      deleteDialog: "deleteDialog",
      addDialog: "addDialog",
      newProduct: "",
      isProduct: false,
    };
  },
  methods: {
    async deleteProduct() {
      const productsRef = db.collection("products");
      if (this.isProduct) {
        const selectedProductRef = productsRef.doc(this.selectedProduct);
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
        const prods = this.selectedProduct.split(";");
        const selectedProductRef = productsRef.doc(prods[0]);

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
    },
    addProduct() {
      if (this.newProduct != "") {
        const productsRef = db.collection("products");
        if (this.isProduct) {
          productsRef
            .doc(this.newProduct)
            .set({})
            .then(() => {
              console.log("product added");
              this.closeDialog(this.addDialog);
            })
            .catch(function(error) {
              console.log("Error adding product:", error);
            });
        } else {
          const subProductRef = productsRef.doc(this.selectedProduct);
          const products = subProductRef.get().then((doc) => {
            let subproducts = doc.data();
            if (!isEmpty(subproducts)) {
              subproducts.subproducts.push(this.newProduct);
            } else {
              subproducts = { subproducts: [this.newProduct] };
            }
            subProductRef
              .set(subproducts)
              .then(() => {
                console.log("subproduct added");
                this.closeDialog(this.addDialog);
              })
              .catch(function(error) {
                console.log("Error adding subproduct:", error);
              });
          });
        }
      }
    },
    displayDialog(type, product) {
      this.selectedProduct = product;
      switch (type) {
        case this.deleteDialog:
          this.showDeleteDialog = true;
          break;
        case this.addDialog:
          this.showAddDialog = true;
          break;
        default:
          break;
      }
    },
    closeDialog(type) {
      switch (type) {
        case this.deleteDialog:
          this.showDeleteDialog = false;
          break;
        case this.addDialog:
          this.showAddDialog = false;
          break;
        default:
          break;
      }
    },
  },
  created() {
    return {
      fetchProducts: db.collection("products").onSnapshot((snapshot) => {
        const tempProducts = [];
        const tempSubproducts = [];
        snapshot.forEach((doc) => {
            tempProducts.push(doc.id);
            tempSubproducts.push(doc.data());
          
        });
        this.products = tempProducts;
        this.subproducts = tempSubproducts;
      }),
    };
  },
};
</script>
