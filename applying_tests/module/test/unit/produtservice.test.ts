import { Product } from '../models/product';

export const productService = {
    async addToCart(productId: number): Promise<void> {
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }
    }
};