<template>
  <v-alert v-if="error">{{ errors }}</v-alert>
  <v-form @submit.prevent="updateUser">
    <v-text-field
      v-model="name"
      :error-messages="nameError"
      label="name"
      name=""
      placeholder="name"
      type="text"
    ></v-text-field>

    <v-text-field
      v-model="email"
      :error-messages="emailError"
      label="email"
      name=""
      placeholder="email"
      type="text"
    ></v-text-field>

    <v-select
      v-model="language"
      :error-messages="languageError"
      :items="['en', 'de']"
      label="language"
      placeholder="language"
    ></v-select>

    <v-btn :disabled="isLoading" color="primary"> update user</v-btn>
  </v-form>
</template>

<script setup>
import { useField, useForm } from 'vee-validate'
import { User_schema } from '@/user/model/IUser.ts'
import { useUserStore } from '@/user/store/userStore.ts'
import { storeToRefs } from 'pinia'

const store = useUserStore()
const { isLoading } = storeToRefs(useUserStore())

const { handleSubmit, errors } = useForm({
  validationSchema: User_schema
})
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: language, errorMessage: languageError } = useField('language')

const updateUser = handleSubmit((values) => {
  alert('Submitted values:', values)
})
</script>
