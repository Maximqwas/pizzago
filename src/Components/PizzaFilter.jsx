import React from "react";
import "./PizzaFilter.css";

const categories = [
  { label: "Усі", value: "all" },
  { label: "Вегетаріанські", value: "vegetarian" },
  { label: "М’ясні", value: "meat" },
  { label: "Гострі", value: "spicy" },
  { label: "Новинки", value: "new" },
];

const PizzaFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="pizza-filter">
      {categories.map((cat) => (
        <button
          key={cat.value}
          className={`filter-button ${activeCategory === cat.value ? "active" : ""}`}
          onClick={() => onCategoryChange(cat.value)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default PizzaFilter;