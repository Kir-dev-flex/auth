import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { registerUser } from "../api/authApi";

export function useRegister () {
    const { login } = useAuth()

    return useMutation({
        mutationFn: ({email, password}) => registerUser(email, password),
        onSuccess: (data, variables) => login(data.token, { email: variables.email }),
    })
}