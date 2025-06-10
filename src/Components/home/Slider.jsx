import React from 'react';
import './Slider.css';
import background from '../../assets/pizza-bg.jpg';
import { FaConciergeBell } from "react-icons/fa";

function Slider() {
  return (
    <section className="slider" style={{ backgroundImage: `url(${background})` }}>
      <div className="slider__search-container">
        <input type="text" className="slider__search" placeholder="Пошук..." />
        <FaConciergeBell className="slider__icon" />
      </div>

      <div className="slider__content">
        <h1 className="slider__title">PizzaGo</h1>
        <p className="slider__subtitle">Піца, в яку закохуєшся з першого шматочка</p>
      </div>
    </section>
  );
}

export default Slider;
