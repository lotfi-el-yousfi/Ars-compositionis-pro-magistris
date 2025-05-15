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
        {{ $t('products.inStock', {stock: product.stockQuantity}) }}
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
import {Product} from '../models/product';
import {useProductStore} from '../stores/product.store';
import {formatPrice} from '@/domains/common/services/price-formatter';

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
</script>w