import {defineStore} from 'pinia';
import {Product} from '../models/product';
import {productService} from '../services/product.service';

interface ProductState {
    cart: {
        items: number[];
        loading: boolean;
        error: string | null;
    };
}

describe('useProductStore', () => {
    it('should add product to cart', async () => {
        const store = defineStore('product', {
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

        const product = {id: 1} as Product;
        await store.actions.addToCart(product.id);

        expect(store.state.cart.items).toContain(product.id);
    });
});