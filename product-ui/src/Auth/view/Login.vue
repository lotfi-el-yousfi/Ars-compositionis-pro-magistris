<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="username" label="Username" required></v-text-field>
    <v-text-field v-model="email" label="Email" required type="email"></v-text-field>
    <v-text-field v-model="password" label="Password" required type="password"></v-text-field>

    <v-btn type="submit" :loading="isLoading">Update Profile</v-btn>

    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-alert v-if="success" type="success">The user has been updated</v-alert>
  </v-form>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useAuthStore} from '@/store/AuthStore';
import {UserProfile} from '@/model/IUser';

const authStore = useAuthStore();
const {user, isLoading, error, success, dispatch_UpdateUser} = authStore;

const username = ref(user?.username || '');
const email = ref(user?.email || '');
const password = ref(user?.password || '');

const handleSubmit = async () => {
  const updatedUser: UserProfile = {
    id: user?.id,
    username: username.value,
    email: email.value,
    password: password.value,
  };

  await dispatch_UpdateUser(updatedUser);
};
</script>
