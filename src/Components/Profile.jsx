import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../assets/Profile_icon.jpg'; // убедись, что файл в src/assets/

function Profile() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedName = localStorage.getItem('userName') || 'Користувач';
        setUserName(storedName);
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#FCE8CF'
            }}
        >
            <div
                style={{
                    padding: '40px',
                    fontFamily: 'sans-serif',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <h2 style={{ marginBottom: '20px' }}>Профіль користувача</h2>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <img
                        src={profileIcon}
                        alt="Аватар"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <p><strong>Ім’я:</strong> {userName}</p>
                </div>

                <div style={{ marginTop: '30px' }}>
                    <Link
                        to="/orders"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#68B024',
                            color: '#FFFFFF',
                            textDecoration: 'none',
                            borderRadius: '6px'
                        }}
                    >
                        Переглянути історію замовлень
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Profile;
