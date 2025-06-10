import React, { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
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

  const validate = () => {
    if (!formData.email.includes('@')) return 'Некоректний email';
    if (formData.password.length < 6) return 'Пароль має бути щонайменше 6 символів';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch('http://143.110.154.85:80/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        // Успешная регистрация
        localStorage.setItem('userName', 'Користувач'); // Тут можна зберегти ім'я користувача, якщо сервер повертає його
        localStorage.setItem('isRegistered', 'true');
        navigate('/profile');
      } else {
        const err = await res.json();
        setError(err.message || 'Помилка реєстрації');
      }
    } catch {
      setError('Помилка зʼєднання з сервером');
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Реєстрація</h2>

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

      <button type="submit" className="form-button">Зареєструватися</button>

      <div className="form-footer">
        <a href="/login">Вже маєте акаунт?</a>
      </div>
    </form>
  );
};

export default Registration;
