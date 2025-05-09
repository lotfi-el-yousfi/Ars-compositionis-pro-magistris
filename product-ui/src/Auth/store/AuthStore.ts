import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

interface IUser {
}

export const useAuthStore = defineStore('AuthStore', () => {
    // State variables
    const user = ref<IUser>()
    const token = ref<string>("")
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)


    return {
        user,
        isLoading,
        error,

    }
}, {
    persist: {
        key: 'secure-user',
        enabled: true,
        storage: localStorage, // or sessionStorage
        paths: ['user '], //select persisted element
        serializer: { ///create using pinia crypt snippet
            serialize: value => JSON.stringify(value),
            deserialize: value => JSON.parse(value)
        }
    }
})

// //HMR (Hot Module Replacement, optional) for dev
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
// }