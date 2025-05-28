import React from 'react';
import './PizzaCard.css';

const PizzaCard = ({ pizza, onAddToCart }) => {
    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(pizza);
        }
    };

    return (
        <div className="pizza-card" role="article" aria-label={`Pizza: ${pizza.name}`}>
            <div className="pizza-image-container">
                <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-image"
                    loading="lazy"
                />
                {pizza.isPopular && (
                    <span className="popular-badge" aria-label="Popular item">
            Popular
          </span>
                )}
            </div>

            <div className="pizza-content">
                <h3 className="pizza-name">{pizza.name}</h3>
                <p className="pizza-description">{pizza.description}</p>

                <div className="pizza-footer">
          <span className="pizza-price" aria-label={`Price: $${pizza.price}`}>
            ${pizza.price}
          </span>
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        aria-label={`Add ${pizza.name} to cart`}
                        type="button"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaCard;