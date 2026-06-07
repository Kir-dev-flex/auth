import { evaluatePassword } from '../validation/passwordStrength'

const COLORS = {
    weak: '#e74c3c',
    medium: '#f39c12',
    strong: '#27ae60',
}

const LABELS = {
    weak: 'Слабый',
    medium: 'Средний',
    strong: 'Сильный',
}

export function PasswordStrength({ password }) {
    if (!password) return null // если пароль пока пустой — ничего не показываю

    const { score, level } = evaluatePassword(password)

    return (
        <div style={{ marginTop: 4 }}>
        <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4].map((i) => (
            <div
                key={i}
                style={{
                flex: 1,
                height: 4,
                background: i <= score ? COLORS[level] : '#ddd',
                borderRadius: 2,
                }}
            />
            ))}
        </div>
        <small style={{ color: COLORS[level] }}>{LABELS[level]}</small>
        </div>
    )
}
