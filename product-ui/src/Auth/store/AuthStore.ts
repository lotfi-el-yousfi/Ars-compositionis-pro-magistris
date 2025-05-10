import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {IUser} from "../model/IUser";

import {API_login} from "../service/authService"


export const useAuthStore = defineStore('AuthStore', () => {
    // State variables
    const user = ref<IUser>()
    const token = ref<string>("")
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const isLoggedIn = computed(() => !!user.value && !!token.value)


    const login = async (username: string, password: string) => {
        try {
            isLoading.value = true
            error.value = null

            token.value = await API_login(username, password)
            user.value = {username, password}
        } catch (err) {
            error.value = err
        } finally {
            isLoading.value = false
        }

    }
    const logout = async () => {
        token.value = null
        user.value = null

    }

    return {
        user,
        token,
        isLoading,
        error,
        isLoggedIn,
        login, logout
    }
}, {
    persist: {
        // key: 'secure-user',
        enabled: true,
        // storage: localStorage, // or sessionStorage
        // paths: ['user '], //select persisted element
        // serializer: { ///create using pinia crypt snippet
        //     serialize: value => JSON.stringify(value),
        //     deserialize: value => JSON.parse(value)
        // }
    }
})

// //HMR (Hot Module Replacement, optional) for dev
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
// }