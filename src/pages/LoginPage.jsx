import { useLogin } from "../hooks/useLogin";
import { validateEmail } from "../validation/email";
import { validatePassword } from "../validation/password";
import { useState } from 'react'
import { Link } from "react-router-dom";

export function LoginPage() {
    const mutation = useLogin()
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors ] = useState({ email: '', password: '' })

    function handleSubmit (e) {
        e.preventDefault()

        const emailError = validateEmail(email)
        const passwordError = validatePassword(password)
        
        if (emailError || passwordError) {
            setErrors({email: emailError, password: passwordError})
            return
        }

        mutation.mutate({email, password})
    }

    function getServerErrorMessage(error) { //Вспомогательаня функция для разбора ошибок
            const status = error?.response?.status
            if (status === 400) return 'Неверный логин или пароль'
            if (status === 422) return 'Некорректные данные'
            return 'Ошибка сервера, попробуйте позже'
        }


    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
        <h1>Вход</h1>

        <label style={{ display: 'flex', gap: '20px', flexDirection: 'column'}}>
            Email
            <input
            type="email"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
                setErrors((prev) => ({ ...prev, email: '' }))  // сбросить ошибку при вводе
            }}
            style={{ borderColor: errors.email ? 'red' : '' }}
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </label>

        <label style={{ display: 'flex', gap: '20px', flexDirection: 'column'}}>
            Пароль
            <input
            type='password'
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev) => ({ ...prev, password: '' }))
            }}
            style={{ borderColor: errors.password ? 'red' : '' }}
            />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </label>

        {mutation.isError && (
        <div style={{ color: 'red' }}>
            {/*  та самая вспомогательаня функция */}
            {getServerErrorMessage(mutation.error)} 
        </div>
        )}

        <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Вхожу...' : 'Войти'}
        </button>

        <Link to='/register'>Нет аккаунта?</Link>
        </form>
    )
}
