import './Footer.css';
import {NavLink} from "react-router-dom";
import React from "react";
import {FiPhone} from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-info">
                <section className="footer-info-left">
                    {/* Add your left content here */}
                </section>
                <section className="footer-info-center">
                    <NavLink to="/registration">Реєстрація</NavLink>
                    <NavLink to="/profile">Профіль</NavLink>
                    <NavLink to="/promotion">Акції</NavLink>
                    <NavLink to="/delivery">Доставка та оплата</NavLink>
                </section>
                <section className="footer-info-right">
                    <div className="footer-phone">
                        <FiPhone className="icon" />
                        <a href="tel:+380506615052">+380(50)-661-50-52</a>
                    </div>
                    <div className="footer-social">
                        <a href="telegram://">
                            <img src="https://img.icons8.com/?size=100&id=lUktdBVdL4Kb&format=png&color=000000" alt="Telegram" />
                        </a>
                        <a href="https://www.instagram.com/pizzago_/">
                            <img src="https://img.icons8.com/?size=100&id=85154&format=png&color=000000" alt="Instagram" />
                        </a>
                        <a href="https://www.apple.com/app-store/">
                            <img src="https://img.icons8.com/?size=100&id=22978&format=png&color=000000" alt="Appstore" />
                        </a>
                        <a href="https://play.google.com/store/games/">
                            <img src="https://img.icons8.com/?size=100&id=22982&format=png&color=000000" alt="Google"/>
                        </a>
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default Footer;