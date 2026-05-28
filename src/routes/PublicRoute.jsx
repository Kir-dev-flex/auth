import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function PublicRoute({ children }) {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/dashboard'
        return <Navigate to={from} replace />
    }

    return children
}
