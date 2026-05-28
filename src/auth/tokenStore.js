// Нам нужен какой то стор, чтобы interceptor брал откуда то токен и прикручивал к каждому запросу. А такой токен у нас будет жить просто где то в памяти, а значит в контексте. А это лишь коробка для контекста, где я буду держать и октуда буду брать токен.

let accessToken = null

export function setAccessToken(token) {
    accessToken = token
}

export function getAccessToken() {
    return accessToken
}

export function clearAccessToken() {
    accessToken = null
}