<template>
  <div>
    <v-app :style="{background: $vuetify.theme.themes[theme].background}">
      <v-navigation-drawer app v-model="drawer"
      class="light-blue lighten-2"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
               {{ $t("commonAppTitle") }}
            </v-list-item-title>
            <v-list-item-subtitle>
               {{ $t("commonAppSubtitle") }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            v-scroll-to="item.scrollto"
            @click.stop="onMenuItemClick(item.scrollto)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <br>
          <v-divider></v-divider>

          <!-- TODO change this to logout if authenticated == true -->
          <v-list-item 
            link
            @click="onMenuItemClick('login')"
          > 
            <v-list-item-icon>
              <v-icon>mdi-chef-hat</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item> 
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="#4FC3F7">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{$t("commonAppTitle")}}</v-toolbar-title>
        <v-spacer></v-spacer>
         <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        <LocaleChanger />
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
         <router-view @authenticated="setAuthenticated" />
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
import VueScrollTo  from 'vue-scrollto';

export default Vue.extend({
  name: "App",
    components: { LocaleChanger },
  data() {
    return {
      langs: ['en','es', 'fr'],
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home', scrollto: "#home" },
        { title: 'Order now!', icon: 'mdi-truck-fast', scrollto:"#order-now"},
        { title: 'About us', icon: 'mdi-pot-steam', scrollto:"#about-us" },
      ],
      authenticated: false,
    };
  },
  computed:{
    theme(){
      return 'light'
    }
  },
  methods: {
      setAuthenticated(status) {
          this.authenticated = status;
      },
      logout() {
          this.authenticated = false;
      },
      onMenuItemClick(menu){
        if (menu == 'login'){
          this.$router.push(menu).catch(()=>{});
        }
        if (menu != 'login' && this.$router.currentRoute.name =='login') {
          this.$router.go(-1);
          // TODO: scroll to clicked item
        }
          
        this.drawer= !this.drawer;
      }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
      document.title = to.meta.title || "A la Paila"
    }
    }
  }
});
</script>
