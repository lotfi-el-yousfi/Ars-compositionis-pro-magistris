import { defineStore } from 'pinia';
import { Product } from '../models/product';
import { productService } from '../services/product.service';

interface ProductState {
    cart: {
        items: number[];
        loading: boolean;
        error: string | null;
    };
}

export const useProductStore = defineStore('product', {
    state: (): ProductState => ({
        cart: {
            items: [],
            loading: false,
            error: null
        }
    }),

    actions: {
        async addToCart(productId: number) {
            this.cart.loading = true;
            this.cart.error = null;

            try {
                await productService.addToCart(productId);
                this.cart.items.push(productId);
            } catch (error) {
                this.cart.error = error.message;
                throw error;
            } finally {
                this.cart.loading = false;
            }
        }
    }
});