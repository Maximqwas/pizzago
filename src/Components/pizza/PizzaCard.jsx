import React, { useState } from "react";
import "./PizzaCard.css";

const PizzaCard = ({ pizza }) => {
    const sizes = pizza.sizes ?? [30];

    const [selectedSize, setSelectedSize] = useState(sizes[0]);

    const handleOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const price = Number(pizza.prices?.[selectedSize] ?? pizza.price ?? 0);

    const item = {
      pizzaId: pizza.id,
      name: pizza.name,
      size: selectedSize,
      quantity: 1,
      unitPrice: price,
      totalPrice: price,
    };

    // Добавим в корзину (можно улучшить: объединять одинаковые пиццы)
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Піца додана до кошика!");
  };

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
                onClick={handleOrder}
            >
                Замовити
            </button>
        </div>
    );
};


export default PizzaCard;
