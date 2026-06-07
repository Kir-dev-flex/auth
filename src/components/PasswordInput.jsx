import { useState } from 'react'

export function PasswordInput({ value, onChange, hasError, placeholder }) {
    const [ isVisible, setIsVisible ] = useState(false)

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} >
            <input type={isVisible? 'text' : 'password' } 
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{ borderColor: hasError ? 'red' : '', flex: 1, paddingRight: 30 }}
            />
            <button
            type='button'
            onClick={() => setIsVisible((v) => !v)}
            aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
            style={{
                position: 'absolute',
                right: 5,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
            }}
            >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
        </div>
    )
}

function EyeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        </svg>
    )
    }

    function EyeOffIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    )
    }