import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { loginUser } from "../api/authApi";
// import { useNavigate } from "react-router-dom";

export function useLogin () {
    const { login } = useAuth()
    return useMutation({
        mutationFn: ({email, password}) => loginUser(email, password),
        onSuccess: (data, variables) => login(data.token, { email: variables.email }),
    })
}