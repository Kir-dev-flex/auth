

export function validateEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!email) return 'Email обязателен'
    if (!emailRegExp.test(email)) return 'Поправьте email'
    return ''
}
