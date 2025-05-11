import {describe, it, expect, beforeEach} from 'vitest';
import {createApp} from 'vue';
import {createPinia, setActivePinia} from 'pinia';
import {createVuetify} from 'vuetify';
import App from '@/App.vue';
import Login from "@/Auth/view/Login.vue";
import {mount} from '@vue/test-utils';
import {useAuthStore} from "@/Auth/store/AuthStore.js";

describe('App startup', () => {
    let app;

    beforeEach(() => {
        app = createApp(App);
        setActivePinia(createPinia())
        app.use(createVuetify());
    });

    it('should mount with user data and update profile', async () => {
        const wrapper = mount(Login);
        const component = wrapper.vm;

        // Mock store with initial fake user data
        const store = useAuthStore();
        store.user = {
            username: 'test',
            email: 'test@test.com',
            password: 'test',
        };

        // Ensure that inputs are populated with user data
        const usernameInput = wrapper.find('input[name="username"]');
        expect(usernameInput.element.value).toBe('test');

        // Simulate user editing data
        await usernameInput.setValue("test2");

        // Simulate form submission
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();

        // Assert success message is shown
        expect(wrapper.text()).toContain("The user has been updated");

    });
});
