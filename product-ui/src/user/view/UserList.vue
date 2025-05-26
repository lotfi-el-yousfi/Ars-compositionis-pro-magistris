<template>
  <v-card flat title="Nutrition">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
      ></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="items" :search="search"></v-data-table>
  </v-card>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '../store/userStore.ts'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { users, isLoading, error } = storeToRefs(useUserStore())

const search = ref('')
const headers = [
  { key: 'name', title: 'name' },
  { key: 'email', title: 'email' },
  { key: 'language', title: 'language' }
]
const items = ref([])

onMounted(async () => {
  await store.dispatch_getUser()
  item.value = users

  headers.value = users[0].keys.map((key) => ({ key, title: key }))
})
</script>
