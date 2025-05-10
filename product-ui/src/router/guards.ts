// router/guard.ts
import {useAuthStore} from "../Auth/store/AuthStore"
import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'

export function useRouterGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const store = useAuthStore()

    if (to.name === 'login') return next()

    if (!store.isLoggedIn) {
        return next({
            name: 'login',
            query: {redirect: to.fullPath}
        })
    }

    return next()
}
