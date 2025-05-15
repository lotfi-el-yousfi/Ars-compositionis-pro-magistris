ProductCard.vue
Apply

```
<template>
  <v-card
    :loading="loading"
    :disabled="disabled"
    data-testid="product-card"
  >
    <v-img
      :src="product.imageUrl"
      height="200"
      data-testid="product-image"
    />

    <v-card-title data-testid="product-title">
      {{ product.name }}
    </v-card-title>

    <v-card-text>
      <div class="price" data-testid="product-price">
        {{ formatPrice(product.price) }}
      </div>
      <div class="stock" data-testid="product-stock">
        {{ $t('products.inStock', { stock: product.stockQuantity }) }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        @click="addToCart"
        data-testid="add-to-cart-btn"
        :disabled="!product.stockQuantity"
      >
        {{ $t('products.addToCart') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Product } from '../models/product';
import { useProductStore } from '../stores/product.store';
import { formatPrice } from '@/domains/common/services/price-formatter';

export default Vue.extend({
  name: 'ProductCard',

  props: {
    product: {
      type: Object as () => Product,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false
    };
  },

  methods: {
    formatPrice,

    async addToCart() {
      const store = useProductStore();
      this.loading = true;
      try {
        await store.addToCart(this.product.id);
        this.$emit('added-to-cart', this.product);
      } catch (error) {
        this.$emit('error', error);
      } finally {
        this.loading = false;
      }
    }
  }
});
</script>

```

Create the Product Model:

product.ts
Apply

```
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
}

```

product.store.ts
Apply

```
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
```

Create the Product Service:

product.service.ts
Apply

```
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

```

Now you can create tests for this component following the project's testing patterns. The component includes:

Props validation
Event emissions
Store integration
Service integration
Loading states
Error handling
Internationalization
Price formatting
Each element has a data - testid attribute for easy testing.You can now practice writing tests for this component following the project's testing structure I explained earlier.

Would you like me to help you create the test file for this component ?

```

```
