import {createRouter, createWebHistory} from 'vue-router'
import {useRouterGuard} from './guards'
import NotFound from '../NotFound.vue'
import UserEdit from '../user/view/UserEdit.vue'
import UserList from '../user/view/UserList.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect(to) {
                return {name: 'userEdit'}
            }
        }, {
            path: '/scheduler',
            component: () => import('../job_scheduler/scheduler.vue')
        },

        {
            path: '/userEdit',
            name: 'userEdit',
            component: UserEdit
        },
        {
            path: '/user-list',
            name: 'UserList',
            component: UserList
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
