// router/guard.ts
import {useAuthStore} from "../Auth/store/AuthStore"
import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import {storeToRefs} from "pinia";

export function useRouterGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {


    const store = useAuthStore()
    const {isLoggedIn, user} = storeToRefs(useAuthStore());


    if (to.name === 'login') return next()


    if (!store.isLoggedIn === true) {
        return next({
            name: 'login',
            query: {redirect: to.fullPath}
        })
    }

    return next()
}
