<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card v-if="confirmation">
      <v-card-title>
        {{ $t("summaryTitle") }}
      </v-card-title>
      <v-card-text>
        {{ $t("summaryFirstLineMessage", { name: customer.name }) }}
      </v-card-text>
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
        <v-btn color="blue darken-1" text @click="closeDialog" :disabled="loading">
          {{ $t("cancelButtonLabel") }}
        </v-btn>
        <v-btn color="primary" text @click="sendFoodOrder" :loading="loading">
          {{ $t("confirmButtonLabel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title>
        {{ $t("commonAppTitle") }}
      </v-card-title>
      <v-card-text v-if="success">
        {{ $t("transactionSuccess") }}
      </v-card-text>
      <v-card-text v-else>
        {{ $t("transactionError") }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeFeedbackDialog" >
          {{ $t("closeButtonLabel") }}
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
  data() {
    return {
      loading: false,
      confirmation: true,
      success: false
    }
  },
  props: {
    dialog: {
      default: false,
    },
    customer: {},
    summary: {},
  },
  methods: {
    closeDialog() {
      this.loading = false;
      this.$emit("close-dialog", this.success);
    },
    closeFeedbackDialog() {
      this.confirmation = true;
      this.$emit("close-dialog", this.success);
    },
    onSuccess(){
      this.loading = false;
      this.confirmation = false;
      this.success = true;
    },
    onError(){
      this.confirmation = false;
      this.loading = false;
    },
    async sendFoodOrder() {
      this.loading = true;
      const bodyJson = {
          order: this.summary,
          customer: this.customer,
          locale: this.$i18n.locale,
      }
      try {
        
        let response = await fetch(
          "https://northamerica-northeast1-baby-alert-app.cloudfunctions.net/send-email",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            body: JSON.stringify(bodyJson),
          }
        );
        if (response.ok) {
          this.onSuccess();
        } else {
          alert("HTTP-Error: " + response.status);
        }
      } catch (error) {
        this.onError();
      }
    },
  },
});
</script>
