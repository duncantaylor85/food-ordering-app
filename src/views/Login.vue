<template>
  <div id="login">
    <br />
    <v-card
      id="login"
      class="mx-auto mt-2"
      max-width="600"
      height="300"
      color="#FFFFFF"
    >
      <v-card-title> {{ $t("loginLabel") }} </v-card-title>
      <v-form @keyup.native.enter="login()">
        <v-card-text>
          <v-text-field
            type="text"
            :label="$t('emailLabel')"
            v-model="input.email"
          ></v-text-field>
          <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            :label="$t('passwordLabel')"
            class="input-group--focused"
            @click:append="show = !show"
            v-model="input.password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="primary" @click="login()">
            {{ $t("loginLabel") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-snackbar
      v-model="snackbar"
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="yellow"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      show: false,
      error: null,
      snackbar: false,
      errorMessage: "",
    };
  },
  methods: {
    login() {
        this.$store.dispatch("user/getToken", { email: this.input.email, password: this.input.password }).then(()=> this.$router.push('admin'));
    },
  },
};
</script>
