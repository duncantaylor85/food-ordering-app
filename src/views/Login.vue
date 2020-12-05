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
  </div>
</template>

<script>
import { auth } from "../components/firebaseInit";

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
    };
  },
  methods: {
    login() {
        auth
        .signInWithEmailAndPassword(this.input.email, this.input.password)
        .then((data) => {
          this.$router.replace({ name: "admin" });
        })
        .catch((err) => {
          this.error = err.message;
          console.log(this.error);
        });
    },
  },
};
</script>
