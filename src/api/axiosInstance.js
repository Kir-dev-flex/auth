import axios from 'axios'
import { clearAccessToken, getAccessToken } from '../auth/tokenStore'

const api = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
    'x-api-key': import.meta.env.VITE_REQRES_KEY,
    },
})

api.interceptors.request.use((config) => { 
    const token = getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`  // Здесь прикручиваю токен к каждому запросу, если он есть конечно же
    }
    return config
})

api.interceptors.response.use( // тут проверяем каждый ВХОДЯЩИЙ запрос на наличие 401 ошибки, чтобы почистить токен (он же поломанный получается) и кинуть на страницу логина, чтобы юзер взял новый токен
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAccessToken()
            // тут будем делать логаут
        }
        return Promise.reject(error)
    }
)

export default api