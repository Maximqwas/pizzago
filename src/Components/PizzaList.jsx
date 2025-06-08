import React, { useEffect, useState } from "react";
import "./PizzaList.css";
import PizzaFilter from "./PizzaFilter";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ limit = 9, withFilter = false, centerLast = false }) => {
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        fetch(`http://143.110.154.85:80/api/v1/pizzas?limit=${limit}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setPizzas(data.results))
            .catch((err) => setError(err.message));
    }, [limit]);

    useEffect(() => {
        console.log("Загруженные пиццы:", pizzas);
    }, [pizzas]);

     const filtered = withFilter
    ? pizzas.filter(
        (pizza) => activeCategory === "all" || pizza.tags.includes(activeCategory)
      )
    : pizzas;
    
    return (
         <div className={`pizza-list-container ${centerLast ? "center-last" : ""}`}>
      {withFilter && (
        <PizzaFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      )}
        <div className={`pizza-list ${centerLast ? "center-last" : ""}`}>
        {error ? (
          <div>Помилка: {error}</div>
        ) : filtered.length === 0 ? (
          <div>Нічого не знайдено</div>
        ) : (
          filtered.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))
        )}
      </div>
        </div>
    );
};

export default PizzaList;
