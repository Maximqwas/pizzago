import React from 'react';
import './Slider.css';
import Header from './Header';
import searchIcon from '../assets/search-icon.png';

function Slider() {
  return (
    <section className="slider">
      <Header />
      <div className="slider__search-container">
        <input type="text" placeholder="Пошук..." className="slider__search" />
        <img src={searchIcon} alt="Search Icon" className="slider__icon" />
      </div>
      <div className="slider__content">
        <h1 className="slider__title">PizzaGo</h1>
        <p className="slider__subtitle">Піца, в яку закохуєшся з першого шматочка</p>
      </div>
    </section>
  );
}

export default Slider;