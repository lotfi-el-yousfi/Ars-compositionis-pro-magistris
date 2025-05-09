import {createRouter, createWebHistory} from 'vue-router'
import App from "./App.vue";
import ProductList from "./product/view/ProductList.vue";
import EditProduct from "./product/view/EditProduct.vue";
import NotFound from  "./components/NotFound.vue"

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
    },
    {
        path: '/ProductList',
        name: 'ProductList',
        component: ProductList,
    }, {
        path: '/EditProduct',
        name: 'EditProduct',
        component: EditProduct,
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router