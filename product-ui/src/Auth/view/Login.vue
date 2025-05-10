<template>
  <v-card class="mx-auto" max-width="400">
    <v-alert v-if="error" color="red" icon="mdi-alert-outline"
             text="Error">{{ error }}
    </v-alert>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
          class="mx-5 my-5"
          v-model="username"
          label="Email"
          type="email"
          :error-messages="emailErrors"
          required
      ></v-text-field>
      <v-text-field
          class="mx-5 my-5"
          v-model="password"
          label="Password"
          type="password"
          :error-messages="passwordErrors"
          required
      ></v-text-field>
      <v-btn class="mx-5 my-5" type="submit" color="primary" :disabled="isLoading">Login</v-btn>
      <p v-if="error" class="red--text">{{ error }}</p>
    </v-form>
  </v-card>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from '@/Auth/store/AuthStore.ts'
import {useRouter} from 'vue-router';

const router = useRouter();

const authStore = (useAuthStore())


const username = ref("admin")
const password = ref("admin")

const onSubmit = async () => {
  await authStore.login(username.value, password.value)

  router.push({name: 'ProductList'});
}

</script>
 