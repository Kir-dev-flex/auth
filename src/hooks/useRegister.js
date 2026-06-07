import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import { registerUser } from "../api/authApi"

export function useRegister() {
    const { login } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: ({ email, password }) => registerUser(email, password),
        onSuccess: (data, variables) => {
            login(data.token, { email: variables.email })
            navigate('/dashboard', { replace: true })
        },
    })
}
