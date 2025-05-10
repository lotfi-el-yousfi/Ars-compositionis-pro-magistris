<script setup>
import {ref} from 'vue';
import {z} from 'zod';
import {useField, useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import {IProductSchema} from "../model/IProduct.ts";
import {useProductStore} from "@/product/store/ProductStore.ts";
import {storeToRefs} from "pinia";

const store = useProductStore()
const {
  products,
  isLoading,
  error,
} = storeToRefs(useProductStore());


const {handleSubmit, errors} = useForm({
  validationSchema: toTypedSchema(IProductSchema),
  validateOnMount: false,   // ❌ Don't validate on page load
  validateOnBlur: true,     // ✅ Validate on blur (good UX)
});
const {value: name, errorMessage: nameError} = useField("name")
const {value: price, errorMessage: priceError} = useField("price")
const {value: description, errorMessage: descriptionError} = useField("description")
const {value: quantity, errorMessage: quantityError} = useField("quantity")
const {value: image, errorMessage: imageError} = useField("image")

const onSubmit = handleSubmit(values => {
  store.dispatch_updateProduct(values)
});

</script>

<template>
  <v-container style="background-color: darkgrey">
    <v-alert color="danger" v-if="error">
      {{ error }}
    </v-alert>
    <v-form @submit.prevent="onSubmit" style="max-width: 500px; margin: 0 auto;">

      <v-text-field
          placeholder="name"
          :error-messages="nameError"
          v-model="name" type="text"></v-text-field>
      <v-text-field
          placeholder="price"
          :error-messages="priceError"
          v-model="price" type="number"></v-text-field>
      <v-text-field
          placeholder="description"
          :error-messages="descriptionError"
          v-model="description"
          type="text"></v-text-field>
      <v-text-field
          placeholder="quantity"
          :error-messages="quantityError"
          v-model="quantity" type="number"></v-text-field>
      <v-text-field
          placeholder="image"
          :error-messages="imageError"
          v-model="image" type="text"></v-text-field>


      <v-btn type="submit"
             color="primary" :disabled="isLoading">
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>