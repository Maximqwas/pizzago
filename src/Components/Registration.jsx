import React, { useState } from 'react';
import './Registration.css'; // подключение CSS

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!formData.email.includes('@')) newErrors.email = 'Некорректный email';
    if (formData.password.length < 6) newErrors.password = 'Минимум 6 символов';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Регистрация прошла успешно!', formData);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <div className="success-message">Вы успешно зарегистрированы!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 className="form-title">Реєстрація</h2>

      <div className="form-group">
        <label>Ім'я</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
        {errors.name && <div className="error-text">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        {errors.email && <div className="error-text">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label>Пароль</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />
        {errors.password && <div className="error-text">{errors.password}</div>}
      </div>

      <button type="submit" className="form-button">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default Registration;
