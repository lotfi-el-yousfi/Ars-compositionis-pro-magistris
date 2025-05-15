import { defineStore } from 'pinia'
import {computed, ref} from 'vue'
import { UserProfile, UserProfile_schema } from "../model/IUser";
import { UpdateUser } from "../service/authService";

export const useAuthStore = defineStore('AuthStore', () => {
    const user = ref<UserProfile | null>(null);
    const token = ref<string | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const success = ref<boolean | null>(null);

    const isLoggedIn = computed(() => {
        return user.value !== null && token.value !== null
    })

    const dispatch_UpdateUser = async (userData: UserProfile) => {
        try {
            // Reset error and success states
            error.value = null;
            success.value = null;
            isLoading.value = true;

            // Validate user data
            UserProfile_schema.parse(userData);

            // Optimistic UI update: Update state before waiting for the response
            user.value = { ...userData };

            // Call the API to update the user profile
            const updatedUser = await UpdateUser(userData);

            // On success, update the user state
            user.value = updatedUser;
            success.value = true;
        } catch (err) {
            if (err instanceof Error) {
                // If the error is from the API service, set the error state
                error.value = err.message || "An unexpected error occurred.";
            } else {
                // Handle schema validation errors or other unexpected errors
                error.value = "Validation failed. Please check your input.";
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        user,
        isLoading,
        error,
        success,
        dispatch_UpdateUser,isLoggedIn
    };
});
