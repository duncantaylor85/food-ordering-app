import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: { themes: {
      light: {
        background: "#FFAC00",
        primary: '#039BE5',
      }
    }},
    lang: {
       t: (key, ...params) => i18n.t(key, params),
    },
  });