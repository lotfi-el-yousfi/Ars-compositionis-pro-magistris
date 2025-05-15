
import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import { createVuetify } from 'vuetify';
import { mount } from '@vue/test-utils';
import ProductCard from '@/domains/products/components/ProductCard.vue';
import { productService } from '@/domains/products/services/product.service';
import { useProductStore } from '@/domains/products/stores/product.store';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 100,
    imageUrl: "test-image.jpg",
    stockQuantity: 1
  };

  beforeEach(() => {
    // Setup Pinia
    setActivePinia(createPinia());
    
    // Mock translations
    vi.mock('vue-i18n', () => ({
      useI18n: () => ({
        t: (key: string) => key
      })
    }));
  });

  function mountComponent(props = {}) {
    return mount(ProductCard, {
      props: {
        product: mockProduct,
        disabled: false,
        ...props
      },
      global: {
        plugins: [createVuetify()]
      }
    });
  }

  describe('Props validation', () => {
    it('should render product details correctly', () => {
      const wrapper = mountComponent();

      expect(wrapper.find('[data-testid="product-image"]').attributes('src')).toBe(mockProduct.imageUrl);
      expect(wrapper.find('[data-testid="product-title"]').text()).toBe(mockProduct.name);
      expect(wrapper.find('[data-testid="product-price"]').text()).toContain(mockProduct.price.toString());
      expect(wrapper.find('[data-testid="product-stock"]').text()).toContain(mockProduct.stockQuantity.toString());
    });

    it('should disable the card when disabled prop is true', () => {
      const wrapper = mountComponent({ disabled: true });
      expect(wrapper.find('[data-testid="product-card"]').attributes('disabled')).toBeTruthy();
    });
  });

  describe('Event emissions', () => {
    it('should emit added-to-cart event when add to cart is clicked', async () => {
      const wrapper = mountComponent();
      
      await wrapper.find('[data-testid="add-to-cart-btn"]').trigger('click');

      expect(wrapper.emitted('added-to-cart')).toBeTruthy();
      expect(wrapper.emitted('added-to-cart')[0]).toEqual([mockProduct]);
    });
  });

  describe('Store integration', () => {
    it('should call store addToCart method when adding to cart', async () => {
      const store = useProductStore();
      const addToCartSpy = vi.spyOn(store, 'addToCart');
      
      const wrapper = mountComponent();
      await wrapper.find('[data-testid="add-to-cart-btn"]').trigger('click');

      expect(addToCartSpy).toHaveBeenCalledWith(mockProduct.id);
    });
  });

  describe('Service integration', () => {
    it('should call product service when adding to cart', async () => {
      const serviceSpy = vi.spyOn(productService, 'addToCart');
      
      const wrapper = mountComponent();
      await wrapper.find('[data-testid="add-to-cart-btn"]').trigger('click');

      expect(serviceSpy).toHaveBeenCalledWith(mockProduct.id);
    });

    it('should handle service errors correctly', async () => {
      const error = new Error('Service error');
      vi.spyOn(productService, 'addToCart').mockRejectedValue(error);
      
      const wrapper = mountComponent();
      await wrapper.find('[data-testid="add-to-cart-btn"]').trigger('click');

      expect(wrapper.emitted('error')).toBeTruthy();
      expect(wrapper.emitted('error')[0]).toEqual([error]);
    });
  });
});