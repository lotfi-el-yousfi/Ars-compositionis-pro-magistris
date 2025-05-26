<script setup>
const props = defineProps({
  foo: IUser
})
</script>

<template>
  <v-card
    class="mx-auto text-white"
    color="#26c6da"
    max-width="400"
    prepend-icon="mdi-twitter"
    title="Twitter"
  >
    <template v-slot:prepend>
      <v-icon size="x-large"></v-icon>
    </template>

    <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar color="grey-darken-3" :image="user.avatar"></v-avatar>
        </template>

        <v-list-item-title>{{ user.name }}</v-list-item-title>

        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-icon class="me-1" icon="mdi-heart"></v-icon>
            <span class="subheading me-2">256</span>
            <span class="me-1">·</span>
            <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
            <span class="subheading">45</span>
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
