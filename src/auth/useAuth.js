// Просто дял удобства, чтобы сразу разворачивать через деструктуризацию

import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
    return useContext(AuthContext)
}