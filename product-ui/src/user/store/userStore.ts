import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IUser } from '../model/IUser'
import { fetchUsers, UpdateUser } from '../service/ressource/userService'
import { useQuery } from '@tanstack/vue-query'

export const useUserStore = defineStore(
  'UserStore',
  () => {
    // State variables
    const user = ref<IUser | null>(null)
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)

    function reset() {
      this.$reset()
    }

    const dispatch_getUser = () => {
      isLoading.value = true

      const {
        data: users,
        isError,
        error
      } = useQuery({
        queryKey: [user.value], // track userid ref for changes
        queryFn: fetchUsers,

        staleTime: 1000 * 60, // expiration time of data
        onSuccess: (data) => (users.value = data),
        onError: (err) => (error.value = err)
      })
    }
    const dispatch_updateUser = (updated_user: IUser) => {
      try {
        isLoading.value = true
        UpdateUser(updated_user)
        user.value = updated_user
        error.value = null
      } catch (e) {
        error.value = e.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      user,
      isLoading,
      error,
      // filteredItems,
      // loadItems
      reset,
      dispatch_updateUser,
      dispatch_getUser
    }
  },
  {
    persist: true
  }
)
