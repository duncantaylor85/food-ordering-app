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
              displayDialog(addDialog, product);
            "
            ><v-icon>mdi-plus</v-icon></v-btn
          >
          <v-btn
            icon
            @click="
              displayDialog(deleteDialog, product);
            "
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
        </v-card-actions>
      </div>

      <div
        v-for="(subproduct, i) in Object.values(products)[index].split(',')"
        :key="i"
        link
        style="padding-left: 30px;padding-right: 100px;"
      >
        <div class="d-flex">
          <v-btn
            style="top: 10px;"
            icon
            @click="
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
      class="mb-6"
      dark
      absolute
      bottom
      right
      fab
      @click="
        displayDialog(addDialog);
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
          <v-btn color="primary" text @click="deleteProduct">
            {{ $t("confirmButtonLabel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {fetchProducts, getProducts} from '@/controllers/ProductsController.js';

export default {
  name: "Admin",
  computed: {products: getProducts()},
  created () {
    this.products = fetchProducts();
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
      products: []
    };
  },
  methods: {
    displayDialog(type, product) {
      this.selectedProduct = product;
      this.isProduct = !product;
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
    addProduct(){
      
      this.$store.dispatch('products/addProduct', {isProduct: this.isProduct, newProduct: this.newProduct, selectedProduct: this.selectedProduct}).then(this.closeDialog(this.addDialog));
    },
    deleteProduct(){

    }
  }
};
</script>
