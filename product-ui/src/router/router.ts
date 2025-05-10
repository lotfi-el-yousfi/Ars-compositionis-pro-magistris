import {createRouter, createWebHistory} from 'vue-router'
import App from "../App.vue";
import ProductList from "../product/view/ProductList.vue";
import EditProduct from "../product/view/EditProduct.vue";
import NotFound from "../components/NotFound.vue"
import Login from "../Auth/view/Login.vue"
import {useRouterGuard} from "./guards"

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})


router.beforeEach(useRouterGuard)

export default router