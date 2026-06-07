import { validateEmail } from "../validation/email";
import { validatePassword } from "../validation/password";
import { useState } from 'react'
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";
import { PasswordInput } from '../components/PasswordInput'
import { PasswordStrength } from '../components/PasswordStrength'

export function RegisterPage() {
    const mutation = useRegister()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors ] = useState({ email: '', password: '', name: '', confirmPassword: '' })
    const [ name, setName ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    function handleSubmit (e) {
        e.preventDefault()

        const nameError = !name ? 'Введите имя' : ''
        const confirmError = password !== confirmPassword ? 'Пароли не совпадают' : ''
        const emailError = validateEmail(email)
        const passwordError = validatePassword(password)
        
        
        if (emailError || passwordError || nameError || confirmError) {
            setErrors({email: emailError, password: passwordError, name: nameError, confirmPassword: confirmError})
            return
        }

        mutation.mutate({
            email, password
        })
    }

    function getServerErrorMessage(error) {
        const status = error?.response?.status
        if (status === 400) return 'Некорректные данные'
        if (status === 409) return 'Email уже занят'
        if (status === 422) return 'Не хватает обязательных полей'
        return 'Ошибка сервера, попробуйте позже'
    }


    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
        <h1>Регистрация</h1>

        <label style={{ display: 'flex', gap: '20px', flexDirection: 'column'}}>
            Имя
            <input 
            type="text"
            value={name}
            onChange={(e) => {
                setName(e.target.value)
                setErrors((prev) => ({ ...prev, name: '' }))
            }}
            style={{ borderColor: errors.name ? 'red' : '' }}
            />
            {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </label>
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
            <PasswordInput
                value={password}
                onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev) => ({ ...prev, password: '' }))
                }}
                hasError={!!errors.password}
            />
            <PasswordStrength password={password} />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </label>
        <label style={{ display: 'flex', gap: '20px', flexDirection: 'column'}}>
            Подтверждение пароля
            <PasswordInput
                value={confirmPassword}
                onChange={(e) => {
                setConfirmPassword(e.target.value)
                setErrors((prev) => ({ ...prev, confirmPassword: '' }))
            }}
                hasError={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
        </label>

        {mutation.isError && <div style={{ color: 'red' }}>
            {/* также обрабатываем ошибки как в логин page */}
            {getServerErrorMessage(mutation.error)} 
        </div>}
        <button
        type="submit"
        disabled={mutation.isPending}
        >
            {mutation.isPending ? 'Регистрируем...' : 'Зарегистрироваться'}
        </button>

        <Link to='/login'>Уже есть аккаунт?</Link>

        </form>
    )
}
