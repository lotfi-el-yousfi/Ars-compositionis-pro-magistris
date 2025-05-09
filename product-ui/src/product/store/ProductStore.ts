import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {IProducts} from "../model/IProduct";

export const useProductStore = defineStore('ProductStore', () => {
    // State variables
    const products = ref<IProducts  []>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    return {
        products,
        isLoading,
        error,

    }
},)