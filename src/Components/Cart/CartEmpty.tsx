import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Кошик вільний <span>😕</span>
    </h2>
    <p>
      Скоріше за все, ви ще не вибрапи піццу.
      <br />
      Для того, щоб заказти, перейдіть на головну сторінку.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Назад</span>
    </Link>
  </div>
);
