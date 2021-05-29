<template>
  <div id="admin" text-center>
    <h1>{{ $t("adminPageTitle") }}</h1>
    <br />
    <h3>{{ $t("productsListTitle") }}</h3>
    <v-card
      id="products"
      class="mx-auto mt-2"
      v-for="(product, index) in Object.keys(products)"
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
              displayDialog(addDialog, product, false);
            "
            ><v-icon>mdi-plus</v-icon></v-btn
          >
          <v-btn
            icon
            @click="
              displayDialog(deleteDialog, product, true);
            "
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
        </v-card-actions>
      </div>

      <div
        v-for="(subproduct, i) in Object.keys(products[product].subproducts)"
        :key="i"
        link
        style="padding-left: 30px;padding-right: 100px;"
      >
        <div class="d-flex">
          <v-btn
            style="top: 10px;"
            icon
            @click="
              displayDialog(deleteDialog, product + ';' + subproduct, false);
            "
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
          <v-card-text v-text="subproduct"></v-card-text>
        </div>
      </div>
    </v-card>
    <v-btn
      color="primary"
      class="mb-6"
      dark
      absolute
      bottom
      right
      fab
      @click="
        displayDialog(addDialog, undefined, true);
      "
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="showAddDialog" width="600">
      <v-card>
        <v-card-title>
         {{isProduct ? $t("addProductTitle") : $t("addSubproductTitle")}}
        </v-card-title>
        <v-card-text>
          {{ isProduct ? $t("addProductMessage") : $t("addSubproductMessage") }}
          <v-text-field
            autofocus
            :label="isProduct ? $t('productLabel') : $t('subproductLabel')"
            v-model="newProduct"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog(addDialog)">
            {{ $t("cancelButtonLabel") }}
          </v-btn>
          <v-btn color="primary" text @click="addProductHandler">
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
          <br />
          <h3 class="pl-6">
            {{
              selectedProduct && selectedProduct.includes(";")
                ? selectedProduct.split(";")[1]
                : selectedProduct
            }}
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog(deleteDialog)">
            {{ $t("cancelButtonLabel") }}
          </v-btn>
          <v-btn color="primary" text @click="deleteProductHandler">
            {{ $t("confirmButtonLabel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {fetchProducts, getProducts, addProduct, deleteProduct} from '@/controllers/ProductsController.js';
import products from '../store/modules/products';

export default {
  name: "Admin",
  created () {
    fetchProducts().then(this.products = getProducts());
  },
  data() {
    return {
      selectedProduct: "",
      showAddDialog: false,
      showDeleteDialog: false,
      deleteDialog: "deleteDialog",
      addDialog: "addDialog",
      newProduct: "",
      isProduct: false, 
      products: {}     
    };
  },
  methods: {
    displayDialog(type, product, isProduct) {
      this.selectedProduct = product;
      this.isProduct = isProduct
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
      this.newProduct = "";
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
    addProductHandler(){
      addProduct(this.isProduct, this.newProduct, this.selectedProduct).then(this.closeDialog(this.addDialog));
    },
    deleteProductHandler(){
      deleteProduct(this.isProduct, this.selectedProduct).then(this.closeDialog(this.deleteDialog));
    }
  }
};
</script>
