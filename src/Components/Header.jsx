import React from 'react';
import './Header.css';
import { FiPhone } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <img src="/logo.png" alt="Logo" className="header__logo" />

      <nav className="header__nav">
        <a href="#">Меню</a>
        <a href="#">Реєстрація</a>
        <a href="#">Акції</a>
        <a href="#">Доставка та оплата</a>
      </nav>

      <div className="header__right">
        <div className="header__phone">
          <FiPhone className="icon" />
          <a href="tel:+380506615052">+380(50)-661-50-52</a>
        </div>
        <FaBell className="icon cart-icon" />
      </div>
    </header>
  );
}

export default Header;
