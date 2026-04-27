import axios from 'axios'

// In production: uses VITE_API_URL env variable
// In development: uses Vite proxy → localhost:5000
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
