export function validatePassword (password) {
    if (!password) return 'Пароль обязателен'
    if (password.length < 6) return 'Минимум 6 символов'
    return ''
}