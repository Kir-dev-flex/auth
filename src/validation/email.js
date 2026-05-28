

export function validateEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/ //можно еще было прописать во вторую часть всякие "гугл.ком" и перечислить все известные адреса почт, но по итогу будет страшновато выглядеть, для этого проекта оставлю так

    if (!email) return 'Email обязателен'
    if (!emailRegExp.test(email)) return 'Поправьте email'
    return ''
}
