import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="section-header">
        <span className="section-tag">GET IN TOUCH</span>
        <h2 className="section-title">SIGNAL.</h2>
        <p className="section-subtitle">
          Your Friendly Neighbourhood Engineer is just a message away. Have an opportunity, project, or idea? Let's connect.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-card">
          <div className="contact-card-header">
            <span className="contact-badge">DIRECT CHANNELS</span>
            <span className="contact-web-icon">🕸️</span>
          </div>

          <div className="contact-info">
            <a
              href="mailto:tejaayyappamithireddy@gmail.com"
              className="contact-item"
            >
              <span className="contact-icon">✉️</span>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <span className="contact-text">tejaayyappamithireddy@gmail.com</span>
              </div>
            </a>

            <a
              href="https://github.com/Ayyappa-mithireddy"
              className="contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">💻</span>
              <div className="contact-details">
                <span className="contact-label">GitHub</span>
                <span className="contact-text">github.com/Ayyappa-mithireddy</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/teja-ayyappa-119aa032a"
              className="contact-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">🌐</span>
              <div className="contact-details">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-text">linkedin.com/in/teja-ayyappa-119aa032a</span>
              </div>
            </a>
          </div>

          <div className="resume-download-box">
            <p className="resume-prompt">Want the full dossier of experience and credentials?</p>
            <a
              href="/Teja_Ayyappa_Resume_Revised.pdf"
              className="btn-resume-download"
              download="Teja_Ayyappa_Resume.pdf"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
