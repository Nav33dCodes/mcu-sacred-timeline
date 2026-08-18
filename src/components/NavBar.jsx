import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './NavBar.css'; // Creating a dedicated CSS file for the flagship navbar

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll to add blur/background when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force permanent dark mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div className={`enterprise-nav-wrapper ${scrolled ? 'nav-scrolled' : ''}`}>
      <header className="enterprise-nav">
        
        {/* Brand Section */}
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            The <span className="text-accent">Sacred</span> Timeline
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="nav-center">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/watch-order" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Watch Order
          </NavLink>
        </nav>
        
        {/* Right Section Empty for centering balance */}
        <div className="nav-right"></div>

      </header>
    </div>
  );
};

export default NavBar;