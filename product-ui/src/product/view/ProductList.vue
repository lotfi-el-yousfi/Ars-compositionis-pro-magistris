<template>
  <v-sheet border rounded>
    <v-data-table
        :headers="headers"
        :hide-default-footer="products.length < 11"
        :items="products"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon color="medium-emphasis" icon="mdi-book-multiple" size="x-small" start></v-icon>

            Popular products
          </v-toolbar-title>

          <v-btn
              class="me-2"
              prepend-icon="mdi-plus"
              rounded="lg"
              text="Add a Product"
              border
              @click="router.push( {name :'EditProduct'})"

          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.title="{ value }">
        <v-chip :text="value" border="thin opacity-25" prepend-icon="mdi-book" label>
          <template v-slot:prepend>
            <v-icon color="medium-emphasis"></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>

          <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)"></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
            prepend-icon="mdi-backup-restore"
            rounded="lg"
            text="Reset data"
            variant="text"
            border
            @click="reset"
        ></v-btn>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
        :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
        :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="record.title" label="Title"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="record.author" label="Author"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select v-model="record.genre" :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']"
                      label="Genre"></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input v-model="record.year" :max="adapter.getYear(adapter.date())" :min="1"
                            label="Year"></v-number-input>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input v-model="record.pages" :min="1" label="Pages"></v-number-input>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>





import {onMounted, ref, shallowRef} from 'vue'
import {useProductStore} from "@/product/store/ProductStore.ts";
import {storeToRefs} from "pinia";
import {useRouter} from 'vue-router';

const router = useRouter();
const store = useProductStore()
const {
  products,
  isLoading,
  error,
  loadAllProducts
} = storeToRefs(useProductStore());







const dialog = shallowRef(false)
const isEditing = shallowRef(false)

const headers = [


  {title: "id", key: "id"},
  {title: "name", key: "name"},
  {title: "price", key: "price"},
  {title: "description", key: "description"},
  {title: "quantity", key: "quantity"},
  {title: "image", key: "image"},
]


onMounted(async () => {
      reset()
      await store.dispatch_loadAllProducts()

    }
)

function add() {

}

function edit(id) {
  isEditing.value = true

  const found = products.value.find(book => book.id === id)


  dialog.value = true
}

function remove(id) {
  const index = products.value.findIndex(book => book.id === id)
  products.value.splice(index, 1)
}

function save() {

}

function reset() {

}
</script>