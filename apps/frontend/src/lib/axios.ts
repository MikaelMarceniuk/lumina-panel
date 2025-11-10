import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Exemplo: se o accessToken expirou, tenta refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      try {
        // tenta pegar novo accessToken
        await api.post('/auth/refresh')
        return api(originalRequest)
      } catch (_refreshError) {
        window.location.href = '/sign-in'
      }
    }

    return Promise.reject(error)
  }
)
