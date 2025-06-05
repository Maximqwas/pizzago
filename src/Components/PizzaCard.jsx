import React, { useState } from "react";
import "./PizzaCard.css";

const PizzaCard = ({ pizza, onOrder }) => {
    // Если нет pizza.sizes, задаём дефолтный массив, например, [30]
    const sizes = pizza.sizes ?? [30]; // дефолтный размер 30 см

    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    return (
        <div className="pizza-card">
            <div className="pizza-image-container">
                <img src={pizza.image} alt={pizza.name} className="pizza-image" />
                {pizza.isFish && <div className="fish-icon">🐟</div>}
            </div>
            <h3 className="pizza-name">{pizza.name}</h3>

            <div className="pizza-sizes">
                {sizes.map((size) => (
                    <button
                        key={size}
                        className={`size-button ${selectedSize === size ? "active" : ""}`}
                        onClick={() => setSelectedSize(size)}
                    >
                        ⌀ {size} см.
                    </button>
                ))}
            </div>

            <p className="pizza-description">{pizza.description}</p>

            <div className="pizza-price">{pizza.price} грн.</div>

            <button
                className="order-button"
                onClick={() => onOrder(pizza, selectedSize)}
            >
                Замовити
            </button>
        </div>
    );
};


export default PizzaCard;
