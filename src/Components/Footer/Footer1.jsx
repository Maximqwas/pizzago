import React from 'react';
import './Footer.css';

const Footer = ({ className = '', companyName = "PizzaGo" }) => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', url: '#facebook', icon: '📘' },
        { name: 'Twitter', url: '#twitter', icon: '🐦' },
        { name: 'Instagram', url: '#instagram', icon: '📷' }
    ];

    return (
        <footer className={`footer ${className}`} role="contentinfo">
            <div className="footer-content">
                <p className="copyright">
                    &copy; {currentYear} {companyName}. All rights reserved.
                </p>

                <nav className="social-links" aria-label="Social media links">
                    {socialLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.url}
                            className="social-link"
                            role="button"
                            aria-label={`Visit our ${link.name} page`}
                        >
                            <span className="social-icon" aria-hidden="true">{link.icon}</span>
                            <span className="social-text">{link.name}</span>
                        </a>
                    ))}
                </nav>

                <div className="footer-info">
                    <p>📞 Телефонсюды </p>
                    <p>📧 мылосюды </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;