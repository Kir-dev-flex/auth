import api from './axiosInstance'

export async function loginUser(email, password) {
    const res = await api.post('/login', { email, password })
    return res.data
}

export async function registerUser(email, password) {
    const res = await api.post('/register', { email, password })
    return res.data
}

export async function getProfile(userId) {
    const res = await api.get(`/users/${userId}`)
    return res.data
}

export async function logoutUser() {
    // Реализовать на реальном беке
    return
}