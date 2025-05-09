<script setup>
import {ref} from 'vue';
import {useField, useForm} from "vee-validate";

const validations = {
  name: value => {
    if (value === null || value === undefined || value.length < 3) {
      return 'Name must be at least 3 characters long.';
    }
    return true;
  },
  price: value => {
    if (value === null || value === undefined || value < 0) {
      return 'Price should be positive.';
    }
    return true;
  },
  description: value => {
    if (value === null || value === undefined || value.length < 10) {
      return 'Description must be at least 10 characters long.';
    }
    return true;
  },
};
const {handleSubmit, errors} = useForm({
  validationSchema: validations,
  validateOnMount: false,   // ❌ Don't validate on page load
  validateOnBlur: true,     // ✅ Validate on blur (good UX)
});
const {value: name} = useField('name');
const {value: price} = useField('price');
const {value: description} = useField('description');


const onSubmit = handleSubmit(values => {
  console.log(values);
});

</script>

<template>
  <v-container style="background-color: darkgrey">
    <form @submit.prevent="onSubmit" style="max-width: 500px; margin: 0 auto;">
      <label for="name" style="display: block; margin-bottom: 8px;">Name:</label>
      <v-text-field
          hide-details="auto" type="text" id="name" v-model="name"
          style="width: 100%; padding: 8px; margin-bottom: 16px;">

      </v-text-field>
      <span v-if="errors.name" style="color: red">{{ errors.name }}</span>

      <label for="price" style="display: block; margin-bottom: 8px;">Price:</label>
      <v-text-field type="number"
          control-variant="stacked"   id="price" v-model="price"
                      style="width: 100%; padding: 8px; margin-bottom: 16px;">

      </v-text-field>

      <span v-if="errors.price" style="color: red">{{ errors.price }}</span>

      <label for="description" style="display: block; margin-bottom: 8px;">Description:</label>
      <v-textarea
          autocomplete="email"
          label="Email" id="description" v-model="description"
          style="width: 100%; padding: 8px; margin-bottom: 16px;"></v-textarea>
      <span v-if="errors.description" style="color: red">{{ errors.description }}</span>

      <button type="submit"
              style="padding: 8px 16px; background-color: #646cff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Submit
      </button>
    </form>
  </v-container>
</template>