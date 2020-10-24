<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title>
        {{ $t("summaryTitle") }}
      </v-card-title>
      <v-card-text> {{ $t("summaryFirstLineMessage", {name: customer.name}) }} </v-card-text>
      <v-card-text class="mx-auto" max-width="600">
        <div class="d-flex" v-for="(order, index) in summary" :key="index">
          <v-card-text>{{ order.name }}</v-card-text>
          <v-card-text>{{ order.counter }} {{ $t("packtLabel") }} </v-card-text>
        </div>
      </v-card-text>
      <v-card-text>
        {{ $t("summarySecondLineMessage", 
          { addressStreet: customer.address.street_number, 
            addressPostcode: customer.address.postcode 
          }),  
        }}
        </v-card-text>
      <v-card-text>
        {{ $t("summaryThirdLineMessage", { number: customer.number }) }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closeDialog">
          {{$t("cancelButtonLabel")}}
        </v-btn>
        <v-btn color="primary" text @click="sendFoodOrder">
          {{$t("confirmButtonLabel")}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "ConfirmationDialog",
  components: {},
  props: {
    dialog: {
      default: false,
    },
    customer: {},
    summary: {},
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
    async sendFoodOrder(){
      try {
        let response = await fetch('https://northamerica-northeast1-baby-alert-app.cloudfunctions.net/send-email', {
          method: 'POST',
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'omit', 
          body:  JSON.stringify(this.summary)
        })
        if (response.ok) {
          this.closeDialog();
          alert("your order has been placed");
        } else {
          alert("HTTP-Error: " + response.status);
        }
      } catch (error) {
        
      }
    }
  },
});
</script>
