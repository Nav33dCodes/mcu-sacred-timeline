import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaFilm } from 'react-icons/fa6';
import './Navbar.css';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div className={`enterprise-nav-wrapper ${scrolled ? 'nav-scrolled' : ''}`}>
      <header className="enterprise-nav">

        {/* LEFT — Brand */}
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            The <span className="text-accent">Sacred</span> Timeline
          </Link>
        </div>

        {/* CENTER — Navigation Links */}
        <nav className="nav-center">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <div className="nav-divider" />
          <NavLink to="/watch-order" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Watch Order
          </NavLink>
          <div className="nav-divider" />
          <a
            href="https://www.marvel.com/movies/avengers-doomsday"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Official Site
          </a>
        </nav>

        {/* RIGHT — Minimal Release Badge */}
        <div className="nav-right">
          <div className="nav-release-badge">
            <FaFilm className="nav-badge-icon" />
            <span className="nav-badge-date">Dec 18, 2026</span>
          </div>
        </div>

      </header>
    </div>
  );
};

export default NavBar;