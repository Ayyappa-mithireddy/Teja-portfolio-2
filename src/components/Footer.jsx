import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="#home" className="footer-logo">
          <span className="logo-accent">T</span>EJA.
        </a>

        <div className="footer-nav">
          <a href="#about" className="footer-nav-link">ORIGIN</a>
          <a href="#skills" className="footer-nav-link">ARSENAL</a>
          <a href="#projects" className="footer-nav-link">BUILDS</a>
          <a href="#education" className="footer-nav-link">ACADEMY</a>
          <a href="#certifications" className="footer-nav-link">AWARDS</a>
          <a href="#contact" className="footer-nav-link">SIGNAL</a>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/Ayyappa-mithireddy"
            className="footer-social-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>

          <a
            href="https://www.linkedin.com/in/teja-ayyappa-119aa032a"
            className="footer-social-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>

        <p className="footer-motto">
          "With great power comes great responsibility — and great code."
        </p>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Teja Ayyappa. All rights reserved.
          </p>
          <span className="footer-badge">🕷️ Your Friendly Neighbourhood Engineer</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
