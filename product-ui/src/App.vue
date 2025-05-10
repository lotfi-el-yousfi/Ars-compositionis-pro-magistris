<template>
  <v-app id="inspire">

    <v-app-bar app height="90">
      <v-app-bar-nav-icon
          @click="drawer = !drawer">

      </v-app-bar-nav-icon>

      <v-toolbar-title>Product Manager
      </v-toolbar-title>

      <v-text-field
          class="mt-7 ml-10 mr-5"
          hide-details
          placeholder="Search..."
          variant="outlined"
          density="compact"
      ></v-text-field>
      <v-btn
          class="mt-7 mr-5"
          prepend-icon="mdi-logout-variant"
          variant="text"
          @click="logout"
          v-if="isLoggedIn"
      > logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-sheet
          class="pa-4"
          color="grey-lighten-4"
      >
        <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
        ></v-avatar>

        <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <router-link :to="{ name: link }" v-for="[icon, text ,link ] in links">

          <v-list-item
              @click="$router.push(link)"
              :key="icon"
              :prepend-icon="icon"
              :title="text"
              link
          ></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
          class="py-8 px-6"
          fluid
      >

        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from './Auth/store/AuthStore.ts'

const authStore = useAuthStore()
const {isLoggedIn}=storeToRefs( useAuthStore())
import {useRouter} from 'vue-router';
import {storeToRefs} from "pinia";

const router = useRouter();
const cards = ['Today', 'Yesterday']
const links = [
  ['mdi-cart', 'product list ', "ProductList"],
  ['mdi-pencil', 'EditProduct', "EditProduct"],
  ['mdi-delete', 'Trash', "EditProduct"],
  ['mdi-alert-octagon', 'Spam', "EditProduct"],
]

const drawer = ref(null)
const logout = () => {
  authStore.logout()

  router.push({name: 'login'});
}
</script>
