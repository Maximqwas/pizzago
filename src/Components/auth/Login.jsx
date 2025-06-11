import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email.includes('@')) {
            setError('Некоректний email');
            return;
        }

        if (formData.password.length < 6) {
            setError('Пароль має бути щонайменше 6 символів');
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
                credentials: 'include',
            });

            if (res.ok) {
                const user = await res.json();
                localStorage.setItem('userName', user.name || '');
                navigate('/profile');
            } else {
                const err = await res.json();
                setError(err.message || 'Невірний логін або пароль');
            }
        } catch {
            setError('Помилка зʼєднання з сервером');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Вхід</h2>

            <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Пароль"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <label className="checkbox-label">
                <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                />
                Запам’ятати мене
            </label>

            {error && <div className="error-text">{error}</div>}

            <button type="submit" className="form-button">Увійти</button>

            <div className="form-footer">
                <a href="/registration">Зареєструватися</a>
            </div>
        </form>
    );
};

export default Login;
