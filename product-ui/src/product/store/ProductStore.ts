import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {IProduct} from "../model/IProduct.ts";
import {fetchAllProducts, updateProduct} from "../service/ressources/productService";

export const useProductStore = defineStore('ProductStore', () => {
    // State variables
    const products = ref<IProduct  []>([])
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const dispatch_loadAllProducts = async () => {
        try {
            isLoading.value = true
            error.value = null
            products.value = await fetchAllProducts()

        } catch (err) {
            error.value = err
        } finally {
            isLoading.value = false
        }
    }
    const dispatch_updateProduct = async (product) => {
        try {
            isLoading.value = true
            error.value = null
            const temp = await updateProduct(product)
            products.value.push(temp)

        } catch (err) {
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    return {
        products,
        isLoading,
        error,
        dispatch_loadAllProducts,
        dispatch_updateProduct
    }
},)