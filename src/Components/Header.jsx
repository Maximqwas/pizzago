import React, { useState, useEffect } from 'react';
import './Header.css';
import { FiPhone } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import { NavLink, Link } from "react-router-dom";

function Header() {

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem('isRegistered') === 'true';
    setIsRegistered(flag);
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <div className="dropdown">
          <span className="nav-item">Меню</span>
          <div className="dropdown-content">
            <Link to="/menu/pizza">Піца</Link>
            <Link to="/menu/drinks">Напої</Link>
          </div>
        </div>
        {isRegistered ? (
          <NavLink to="/profile">Профіль</NavLink>
        ) : (
          <NavLink to="/registration">Реєстрація</NavLink>
        )}
        <NavLink to="/promotion">Акції</NavLink>
        <NavLink to="/delivery">Доставка та оплата</NavLink>
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
