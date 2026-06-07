export function evaluatePassword(password) {
    const checks = [
        password.length >= 8,                         // 1) длина
        /[A-Z]/.test(password),                       // 2) есть заглавная буква
        /\d/.test(password),                          // 3) есть цифра
        /[!@#$%^&*(),.?":{}|<>_-]/.test(password),   // 4) есть спецсимвол
    ]

    const score = checks.filter(Boolean).length    // сколько true

    let level = 'weak'
    if (score === 2) level = 'medium'
    if (score >= 3) level = 'strong'

    return { score, level }
}
