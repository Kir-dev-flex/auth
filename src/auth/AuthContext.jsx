import { createContext, useState, useEffect } from "react";
import { setAccessToken, clearAccessToken } from './tokenStore'
import { useQueryClient } from "@tanstack/react-query";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

export function AuthProvider({children}) { // делаем контекст, где будем хранить инфу о юзере, статусе логина. Все дети это подхватят
    
    const queryClient = useQueryClient()
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    function login (token, userData) { // логинимся, пишем токен в память (только в память и никуда больше), обновляем юзера, добавляем в контекст инфу что залогинены
        setAccessToken(token)
        setUser(userData)
        setIsAuthenticated(true)
    }

    function logout () { // Наоборот
        clearAccessToken()
        setUser(null)
        setIsAuthenticated(false)
        queryClient.clear()
    }

    useEffect(() => {
  // сюда вписать вызов silent refresh на /refresh. на reqres.in эндпоинта нет, поэтому заглушка
}, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}