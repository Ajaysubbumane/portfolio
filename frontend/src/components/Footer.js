import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <div className="footer-mark">A</div>
          <div>
            <p className="footer-name">Ajay Subbumane</p>
            <p className="footer-tag">Delivering reliable web experiences.</p>
          </div>
        </div>

        <div className="footer-links">
          <p className="footer-title">Explore</p>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/projects" className="footer-link">Projects</Link>
          <Link to="/skills" className="footer-link">Skills</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        <div className="footer-social">
          <p className="footer-title">Social</p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>

        <div className="footer-contact">
          <p className="footer-title">Contact</p>
          <a href="mailto:ajaydevadiga600@gmail.com">ajaydevadiga600@gmail.com</a>
          <span>Based in Bhatkal, Karnataka</span>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Ajay Subbumane</span>
          <span>Built with React · Flask</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
