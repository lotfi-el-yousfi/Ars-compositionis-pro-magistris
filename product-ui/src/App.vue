<template>
  <v-app id="inspire">
    <v-app-bar app height="90">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>Product Manager </v-toolbar-title>

      <v-text-field
        class="mt-7 ml-10 mr-5"
        density="compact"
        hide-details
        placeholder="Search..."
        variant="outlined"
      ></v-text-field>
      <v-btn
        v-if="isLoggedIn"
        class="mt-7 mr-5"
        prepend-icon="mdi-logout-variant"
        variant="text"
        @click="logout"
      >
        logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>john@google.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <router-link v-for="[icon, text, link] in links" :to="{ name: link }">
          <v-list-item
            :key="icon"
            :prepend-icon="icon"
            :title="text"
            link
            @click="$router.push(link)"
          ></v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

// const authStore = useAuthStore()
// const {token, isLoggedIn} = storeToRefs(useAuthStore())
//
// const router = useRouter();
const cards = ['Today', 'Yesterday']
const links = [
  ['mdi-cart', 'product list '],
  ['mdi-pencil', 'EditProduct'],
  ['mdi-delete', 'Trash'],
  ['mdi-alert-octagon', 'Spam']
]

const drawer = ref(null)
const logout = () => {
  // authStore.logout()
  //
  // router.push({name: 'login'});
}
</script>
