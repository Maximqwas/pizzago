import React, { useEffect, useState } from "react";
import "./PizzaList.css";

import PizzaCard from "./PizzaCard";

const PizzaList = () => {
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const limit = 7;
    const offset = 0;

    useEffect(() => {
        fetch(`http://143.110.154.85:80/api/v1/pizzas?limit=${limit}&offset=${offset}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setPizzas(data.results))
            .catch((err) => setError(err.message));
    }, []);

    if (error) {
        return <div>Помилка: {error}</div>;
    }

    return (
        <div className="pizza-list">
            {pizzas.length === 0 ? (
                <div>Завантаження піцц...</div>
            ) : (
                pizzas.map((pizza) => (
                    <PizzaCard key={pizza.id} pizza={pizza} />
                ))
            )}
        </div>
    );
};

export default PizzaList;
