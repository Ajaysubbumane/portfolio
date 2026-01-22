import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="nav-container">
          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li><Link className={location.pathname === '/' ? 'active' : ''} to="/" onClick={() => setMenuOpen(false)}><span>Home</span></Link></li>
            <li><Link className={location.pathname === '/about' ? 'active' : ''} to="/about" onClick={() => setMenuOpen(false)}><span>About</span></Link></li>
            <li><Link className={location.pathname === '/projects' ? 'active' : ''} to="/projects" onClick={() => setMenuOpen(false)}><span>Projects</span></Link></li>
            <li><Link className={location.pathname === '/certificates' ? 'active' : ''} to="/certificates" onClick={() => setMenuOpen(false)}><span>Certificates</span></Link></li>
            <li><Link className={location.pathname === '/skills' ? 'active' : ''} to="/skills" onClick={() => setMenuOpen(false)}><span>Skills</span></Link></li>
            <li><Link className={location.pathname === '/contact' ? 'active' : ''} to="/contact" onClick={() => setMenuOpen(false)}><span>Contact</span></Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
