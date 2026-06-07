# Auth — учебный проект

Авторизация и регистрация пользователя на React + Vite + TanStack Query.

## Запуск

```bash
npm install
npm run dev
```

### Переменные окружения

Создать `.env` в корне:

```
VITE_REQRES_KEY=твой_ключ_с_app.reqres.in
```

Тестовый аккаунт reqres: `eve.holt@reqres.in` / `cityslicka`.

## Стек

- React 18 + Vite 5
- TanStack Query v5
- axios
- React Router v6
- Бэкенд — reqres.in

## Что реализовано

Обязательная часть: API-слой с interceptors, AuthContext с хранением токена в памяти, формы с валидацией, ProtectedRoute / PublicRoute, Dashboard.

Бонусы: показать/скрыть пароль, индикатор надёжности пароля.

## Хранение токена

Access token хранится **только в памяти** (module-level переменная в `auth/tokenStore.js`). Не в `localStorage` — это требование ТЗ для защиты от XSS.

## Silent refresh — заглушка

В `AuthContext.jsx` в `useEffect` оставлено место под паттерн silent refresh: при старте приложения фронт делает запрос на `/refresh`, браузер автоматически прикладывает httpOnly-куку, сервер возвращает новый access token. Если кука протухла — редирект на `/login`. reqres.in не предоставляет refresh-эндпоинт, поэтому реализована только архитектура (TODO-комментарий).

## Связь interceptor → AuthContext

Response interceptor живёт вне React-дерева и не может вызвать `useAuth()` напрямую. Связь через callback в `tokenStore`: `AuthProvider` регистрирует свою функцию `logout` через `setOnUnauthorized`, interceptor при 401 дёргает `triggerUnauthorized`. Это синхронизирует токен и React-state.
