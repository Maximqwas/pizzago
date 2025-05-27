import React from 'react';
import './Header.css'; 

function Header() {
  return (
    <header className="header">
      <div className="header__left">
        <img src="/logo.png" alt="PizzaGo Logo" className="header__logo" />
      </div>

      <nav className="header__nav">
        <a href="#">Меню</a>
        <a href="#">Реєстрація</a>
        <a href="#">Акції</a>
        <a href="#">Доставка та оплата</a>
      </nav>

      <div className="header__right">
        <div className="header__phone">
          <span className="phone-icon">📞</span>
          <a href="tel:+380506615052">+380(50)-661-50-52</a>
        </div>
        
        
      </div>
    </header>
  );
}

export default Header;