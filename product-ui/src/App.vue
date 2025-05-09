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
        <v-list-item
            v-for="[icon, text] in links"
            :key="icon"
            :prepend-icon="icon"
            :title="text"
            link
        ></v-list-item>
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

const cards = ['Today', 'Yesterday']
const links = [
  ['mdi-inbox-arrow-down', 'Inbox'],
  ['mdi-send', 'Send'],
  ['mdi-delete', 'Trash'],
  ['mdi-alert-octagon', 'Spam'],
]

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
  }),
}
</script>