import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import * as labs from 'vuetify/labs/components'  // Add this line
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {createPinia} from "pinia";
import router from "./router/router.ts";

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)


const vuetify = createVuetify({
    components: {
        ...components,
        ...labs  // Add this line
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})
createApp(App).use(vuetify)
    .use(router)
    .use(pinia).mount('#app')