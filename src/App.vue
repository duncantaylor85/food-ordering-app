<template>
  <div>
    <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
      <v-navigation-drawer app v-model="drawer" color="#FFFFFF">
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

        <v-list dense nav>
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
              <v-list-item-title>{{ $t(item.label) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <br />
          <v-divider></v-divider>
          <v-list-item
            v-if="!user.loggedIn"
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
          <v-list-item v-else link @click="onMenuItemClick('admin')">
            <v-list-item-icon>
              <v-icon>mdi-chef-hat</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("adminMenuLabel") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="#FFFFFF">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="hidden-sm-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("commonAppTitle") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            text
            v-for="item in items"
            :key="item.title"
            link
            v-scroll-to="item.scrollto"
            @click.stop="onMenuItemClick(item.scrollto)"
          >
            {{ item.title }}
          </v-btn>
        </v-toolbar-items>
        <router-link
          v-if="user.loggedIn"
          to="/login"
          v-on:click.native="logout()"
          replace
          >Logout</router-link
        >
        <LocaleChanger />
      </v-app-bar>
      <v-parallax dark src="@/assets/test.png">
        <v-layout
          white--text
          align-center
          column
          justify-center
          style="margin-top: 8.5em;"
        >
          <img src="@/assets/logowhite.png" height="150" />
          <h4 class="subheading">De la Paila a tu Mesa!</h4>
          <v-flex row wrap text-xs-center>
            <v-btn
              dark
              large
              color="red lighten-2"
              class="mt-4 elevation-0"
              v-scroll-to="'#order-now'"
              @click.stop="onMenuItemClick('#order-now')"
            >
              {{ $t("orderNowTitle") }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-parallax>
      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import LocaleChanger from "./components/LocaleChanger.vue";
import VueScrollTo from "vue-scrollto";
import { auth } from "./components/firebaseInit";

export default Vue.extend({
  name: "App",
  components: { LocaleChanger },
  data() {
    return {
      langs: ["en", "es", "fr"],
      drawer: false,
      items: [
        {
          title: "Home",
          icon: "mdi-home",
          scrollto: "#home",
          label: "homeMenuLabel",
        },
        {
          title: "Order now!",
          icon: "mdi-truck-fast",
          scrollto: "#order-now",
          label: "orderNowMenuLabel",
        },
        {
          title: "About us",
          icon: "mdi-pot-steam",
          scrollto: "#about-us",
          label: "aboutUsMenuLabel",
        },
      ],
    };
  },
  computed: {
    theme() {
      return "light";
    },
    ...mapGetters("user", {
      user: "user",
    }),
  },

  methods: {
    logout() {
      auth
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("loggout out");
        })
        .catch(function(error) {
          // An error happened.
          console.log("error logout", error);
        });
    },
    onMenuItemClick(menu) {
      if (menu == "login") {
        this.$router.push(menu).catch(() => {});
      } else {
        this.$router.push("/" + menu).catch(() => {});
      }

      if (this.drawer) {
        this.drawer = !this.drawer;
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || "A la Paila";
      },
    },
  },
});
</script>
