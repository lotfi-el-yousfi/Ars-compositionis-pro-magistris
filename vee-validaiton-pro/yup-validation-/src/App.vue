<script setup>
import {useField, useForm} from "vee-validate";
import {toFormValidator} from '@vee-validate/zod';
import {z} from 'zod';

// Define validations
const validations = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number({
    invalid_type_error: "Price must be a number",
  }).min(3, "Price must be at least 3"),
  description: z.string().max(125, "Description must be 125 characters or less"),
});

// Initialize form
const {handleSubmit, errors} = useForm({
  validationSchema: toFormValidator(validations),
  initialValues: {
    name: '',
    price: undefined,
    description: ''
  }
});

// Register fields - names must match schema keys
const {value: name} = useField('name');
const {value: price} = useField('price', undefined, {
  // Transform string input to number
  transform: (value) => value === '' ? undefined : Number(value)
});
const {value: description} = useField('description');

const onSubmit = handleSubmit((values) => {
  console.log(validations.parse(values));
});


</script>

<template>
  <form @submit.prevent="onSubmit" style="max-width: 500px; margin: 0 auto;">
    <label for="name" style="display: block; margin-bottom: 8px;">Name:</label>
    <input type="text" id="name" v-model="name" style="width: 100%; padding: 8px; margin-bottom: 4px;"/>
    <span v-if="errors.name" style="color: red">{{ errors.name }}</span>

    <label for="price" style="display: block; margin-top: 16px;">Price:</label>
    <input type="number" id="price" v-model="price" style="width: 100%; padding: 8px; margin-bottom: 4px;"/>
    <span v-if="errors.price" style="color: red">{{ errors.price }}</span>

    <label for="description" style="display: block; margin-top: 16px;">Description:</label>
    <textarea id="description" v-model="description" style="width: 100%; padding: 8px; margin-bottom: 4px;"></textarea>
    <span v-if="errors.description" style="color: red">{{ errors.description }}</span>

    <button type="submit"
            style="margin-top: 20px; padding: 8px 16px; background-color: #646cff; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Submit
    </button>
  </form>


  <v-data-table
      :headers="[{ value: 'name', text: 'Name' }, { value: 'price', text: 'Price' }, { value: 'description', text: 'Description' }]"
      :items="[{ name: 'test 1', price: 10, description: 'test 1' }, { name: 'test 2', price: 20, description: 'test 2' }]"
      class="elevation-1"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.description }}</td>
      </tr>
    </template>
  </v-data-table>
</template>