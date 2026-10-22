import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <span className="logo-accent">T</span>EJA.
        </a>

        {/* Desktop Menu */}
        <div className="nav-links">
          <a href="#about" className="nav-link">ORIGIN</a>
          <a href="#skills" className="nav-link">ARSENAL</a>
          <a href="#projects" className="nav-link">BUILDS</a>
          <a href="#education" className="nav-link">ACADEMY</a>
          <a href="#certifications" className="nav-link">AWARDS</a>
          <a href="#contact" className="nav-link">SIGNAL</a>
        </div>

        {/* External Social Actions */}
        <div className="nav-actions">
          <a
            href="https://github.com/Ayyappa-mithireddy"
            className="nav-social-btn"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/teja-ayyappa-119aa032a"
            className="nav-social-btn"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`hamburger-btn ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Mobile Drawer Menu */}
        <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
          <div className="mobile-menu-items">
            <a href="#home" className="mobile-link" onClick={closeMenu}>HOME</a>
            <a href="#about" className="mobile-link" onClick={closeMenu}>ORIGIN</a>
            <a href="#skills" className="mobile-link" onClick={closeMenu}>ARSENAL</a>
            <a href="#projects" className="mobile-link" onClick={closeMenu}>BUILDS</a>
            <a href="#education" className="mobile-link" onClick={closeMenu}>ACADEMY</a>
            <a href="#certifications" className="mobile-link" onClick={closeMenu}>AWARDS</a>
            <a href="#contact" className="mobile-link" onClick={closeMenu}>SIGNAL</a>
            <div className="mobile-socials">
              <a
                href="https://github.com/Ayyappa-mithireddy"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/teja-ayyappa-119aa032a"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
