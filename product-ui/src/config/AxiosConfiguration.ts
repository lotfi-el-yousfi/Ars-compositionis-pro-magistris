// services/axiosInstance.ts
import axios from 'axios'
import {useAuthStore} from '../Auth/store/AuthStore'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request Interceptor: Add token if logged in
axiosInstance.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// Response Interceptor: Handle global errors
axiosInstance.interceptors.response.use((response) => {
    return response
}, (error) => {
    const message = error?.response?.data?.message || error.message
    console.error('❌ API Error:', message)

    // optional: use a toast here
    // toast.error(message)

    return Promise.reject(error)
})

export default axiosInstance
