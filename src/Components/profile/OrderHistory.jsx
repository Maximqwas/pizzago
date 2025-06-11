import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data.orders || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Ошибка загрузки заказов:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>📘 История заказов</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : orders.length === 0 ? (
                <p>У вас пока нет заказов.</p>
            ) : (
                <ul style={{ padding: 0, listStyle: 'none' }}>
                    {orders.map(order => (
                        <li key={order.orderId} style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '12px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <strong>Заказ #{order.orderId}</strong><br />
                            Дата: {new Date(order.createdAt).toLocaleString()}<br />
                            Сумма: {order.total.toFixed(2)} грн<br />
                            Статус: {order.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
