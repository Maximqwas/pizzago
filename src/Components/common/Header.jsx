import React, { useState, useEffect, useContext } from 'react';
import './Header.css';
import { FiPhone } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

function Header() {

  const { user, logout } = useContext(AuthContext);

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
        {user ? (
          <>
            <NavLink to="/profile">Профіль</NavLink>
            <button onClick={logout} className="logout-btn">Вийти</button>
          </>
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
