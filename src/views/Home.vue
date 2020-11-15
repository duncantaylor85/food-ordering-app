<template>
  <div class="home">
     <v-card id="home" class="mx-auto mt-2" max-width="600" height="500" color="#FFECC8">
      <v-card-text class="pb-4">
        <v-img
        height="250"
        contain
        src="@/assets/paila.png"
        ></v-img>
      </v-card-text>   
      <v-card-text>
        <v-divider class="mx-4"></v-divider>
        <div class="my-4 subtitle-1">
          {{$t("homeTitle")}}
        </div>
        <div>{{$t("homeDescription")}}
         <br> 
         <br>
         {{$t("homeDescription2")}}  
        </div>
      </v-card-text>
    </v-card>
    <v-card id="order-now" class="mx-auto mt-2" max-width="600" color="#FFECC8">
      <v-card-title> {{$t("orderNowTitle")}} </v-card-title>
      <div class="d-flex" v-for="(filling, index) in fillings" :key="index">
        <v-card-text>{{ filling.name }}</v-card-text>
        <v-card-text>{{ filling.counter }} {{ $t("packtLabel") }}</v-card-text>
        <v-card-actions>
          <v-btn icon @click="decrease(filling)"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
          <v-btn icon @click="increase(filling)"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-card-actions>
      </div>
      <CustomerForm :customer.sync="customer" :isFormValid.sync="isFormValid" :bus="bus"/> 
      <p class="text-h5 mt-2 pl-4">{{ $t("totalCostLabel", {price: price}) }}</p>
      <v-card-actions>
        <v-btn
          class="mx-auto mb-6"
          color="primary"
          :disabled="isDisabled"
          @click.prevent="openConfirmation()"
          >{{ $t("submitButtonLabel") }}</v-btn
        >
      </v-card-actions>
    </v-card>
     <v-card id="about-us" class="mx-auto mt-2" max-width="600" height="400" color="#FFECC8"> 
       <v-card-text>
        <br/>
        {{$t("aboutUsTitle")}}
        <br/>
        <br/>
        {{$t("aboutUsDescription")}}
       </v-card-text>
       <v-card-text class="pb-4">
        <v-img
        height="250"
        contain
        src="@/assets/cerro.png"
        ></v-img>
      </v-card-text>   
    </v-card>
    <ConfirmationDialog
      :dialog="confirmData.dialog"
      :customer="customer"
      :summary="confirmData.summary"
      @close-dialog="closeDialog"
    />
  </div>
</template>

<script>
import Vue from "vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import CustomerForm from "@/components/CustomerForm.vue";

export default Vue.extend({
  name: "Home",
  components: { ConfirmationDialog, CustomerForm },
  computed: {
    price() {
      let totalPacks = 0;
      let totalCost = 0;
      this.fillings.forEach((filling) => {
        totalPacks += filling.counter;
      });
      totalCost = totalPacks * 7;
      totalCost = totalCost - totalPacks / 3;
      return Math.ceil(totalCost);
    },
    isDisabled() {
      return (
        this.fillings
          .filter((x) => x.counter != 0)
          .map((x) => x.counter)
          .reduce((a, b) => a + b, 0) < 3
      );
    },
  },
  methods: {
    decrease(filling) {
      if (filling.counter > 0) {
        filling.counter--;
      }
    },
    increase(filling) {
      if (filling.counter < 100) {
        filling.counter++;
      }
    },
     resetForm(){
      this.fillings.forEach((filling) => filling.counter = 0);
      this.bus.$emit('reset');
    },
    openConfirmation() {
        this.bus.$emit('checkFormValid');
        if (this.isFormValid) {
          this.confirmData.dialog = true;
          this.confirmData.summary = this.fillings.filter((x) => x.counter != 0);
        }      
    },
    closeDialog(success) {
      this.confirmData.dialog = false;
      if (success) this.resetForm();
    },
  },
  data() {
    return {
      bus: new Vue(),
      isFormValid: false,
      customer: {
        name: "",
        email: "",
        number: "",
        address: {
          street_number: "",
          postcode: "",
        },
        
      },
      fillings: [
        {
          name: "Carne Mechada",
          counter: 0,
        },
        {
          name: "Carne Molida",
          counter: 0,
        },
        {
          name: "Pollo",
          counter: 0,
        },
        {
          name: "Queso",
          counter: 0,
        },
        {
          name: "Cazón",
          counter: 0,
        },
      ],
      confirmData: {
        dialog: false,
        summary: {},
      },
    };
  },
});
</script>
