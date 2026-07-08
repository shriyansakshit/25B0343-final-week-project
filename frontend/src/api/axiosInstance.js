import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('mg_token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mg_token')
      localStorage.removeItem('mg_user')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
