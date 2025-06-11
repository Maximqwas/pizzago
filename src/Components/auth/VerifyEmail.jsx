// VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('Перевірка...');
    const token = searchParams.get('token');

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await fetch(`http://143.110.154.85:80/api/v1/auth/verify-email?token=${token}`);
                const data = await res.json();
                if (res.ok) {
                    setMessage(data.message);
                } else {
                    setMessage(data.message || 'Не вдалося підтвердити email');
                }
            } catch {
                setMessage('Помилка з’єднання з сервером');
            }
        };

        if (token) verify();
        else setMessage('Немає токена');
    }, [token]);

    return <div style={{ padding: '20px', textAlign: 'center' }}>{message}</div>;
};

export default VerifyEmail;
