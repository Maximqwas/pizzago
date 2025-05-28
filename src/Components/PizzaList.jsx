import React, { useState } from 'react';
import PizzaCard from './PizzaCard';
import './PizzaList.css';

const PizzaList = ({ pizzas, onAddToCart }) => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    const filteredPizzas = pizzas.filter(pizza => {
        if (filter === 'all') return true;
        if (filter === 'popular') return pizza.isPopular;
        if (filter === 'vegetarian') return pizza.isVegetarian;
        return true;
    });

    const sortedPizzas = [...filteredPizzas].sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    return (
        <section className="pizza-list-container" aria-label="Pizza menu">
            <div className="pizza-controls">
                <div className="filter-controls">
                    <label htmlFor="filter-select" className="control-label">
                        Filter:
                    </label>
                    <select
                        id="filter-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="control-select"
                        aria-label="Filter pizzas"
                    >
                        <option value="all">All Pizzas</option>
                        <option value="popular">Popular</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>
                </div>

                <div className="sort-controls">
                    <label htmlFor="sort-select" className="control-label">
                        Sort by:
                    </label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="control-select"
                        aria-label="Sort pizzas"
                    >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>

            <div className="pizza-grid" role="grid" aria-label="Pizza selection grid">
                {sortedPizzas.map(pizza => (
                    <PizzaCard
                        key={pizza.id}
                        pizza={pizza}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>

            {sortedPizzas.length === 0 && (
                <div className="no-pizzas" role="status" aria-live="polite">
                    No pizzas found matching your criteria.
                </div>
            )}
        </section>
    );
};

export default PizzaList;