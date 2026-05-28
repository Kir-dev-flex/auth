import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../auth/useAuth'

export function DashboardPage() {
    const { user, logout } = useAuth()
    const profileQuery = useProfile(2)   // id = 2 хардкодим, reqres другого не знает

    if (profileQuery.isLoading) return <div>Загрузка профиля...</div>
    if (profileQuery.isError) return <div>Не удалось загрузить профиль</div>

    const profile = profileQuery.data?.data

    return (
        <div style={{ padding: 20 }}>
        <h1>Привет, {profile?.first_name} {profile?.last_name}!</h1>
        <p>Email из контекста (то, чем логинился): {user?.email}</p>
        <button onClick={logout}>Выйти</button>
        </div>
    )
}
