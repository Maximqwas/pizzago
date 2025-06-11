import React, { useState } from 'react';
import './ResendVerification.css'; // підключаємо стилі

const ResendVerification = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://143.110.154.85:80/api/v1/auth/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage(data.message);
                setError('');
            } else {
                setError(data.message || 'Помилка повторної відправки');
                setMessage('');
            }
        } catch {
            setError('Помилка з’єднання з сервером');
        }
    };

    return (
        <div className="resend-container">
            <form onSubmit={handleSubmit} className="resend-form">
                <h3>Повторна верифікація</h3>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Надіслати повторно</button>
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default ResendVerification;
