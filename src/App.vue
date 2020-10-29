<template>
  <div>
    <v-app :style="{background: $vuetify.theme.themes[theme].background}">
      <v-navigation-drawer app v-model="drawer"> </v-navigation-drawer>

      <v-app-bar app color="#f5bb00">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>A la Paila</v-toolbar-title>
        <v-spacer></v-spacer>
        <LocaleChanger />
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Vue from "vue";
import LocaleChanger from "./components/LocaleChanger.vue";


export default Vue.extend({
  name: "App",
    components: { LocaleChanger },
  data() {
    return {
      langs: ['en','es', 'fr'],
      drawer: false,
    };
  },
  computed:{
    theme(){
      return 'light'
    }
  }
});
</script>
