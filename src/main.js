import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { i18n } from "./plugins/i18n";
import VueScrollTo from "vue-scrollto";

Vue.config.productionTip = false;

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -80,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
