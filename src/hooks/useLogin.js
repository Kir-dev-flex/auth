import { useMutation } from "@tanstack/react-query"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import { loginUser } from "../api/authApi"

export function useLogin() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    return useMutation({
        mutationFn: ({ email, password }) => loginUser(email, password),
        onSuccess: (data, variables) => {
            login(data.token, { email: variables.email })
            const from = location.state?.from?.pathname || '/dashboard'
            navigate(from, { replace: true })
        },
    })
}
