import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { entries } from '../data/mcuData';
import './NavBar.css'; // Creating a dedicated CSS file for the flagship navbar

const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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

  // Dark mode logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Search Logic
  const searchableEntries = useMemo(() => {
    return entries;
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(searchableEntries, {
      keys: [{ name: 'title', weight: 2 }, { name: 'summary', weight: 1 }],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [searchableEntries]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const fuseResults = fuse.search(query);
    setResults(fuseResults.map(result => result.item));
  }, [query, fuse]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleResultClick = () => {
    navigate(`/watch-order`);
    closeSearch();
  };

  return (
    <div className={`enterprise-nav-wrapper ${scrolled ? 'nav-scrolled' : ''}`}>
      <header className="enterprise-nav">
        
        {/* Brand Section */}
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            The <span className="text-accent">Sacred</span> Timeline
          </Link>
        </div>

        {/* Center Navigation Links (Hidden when searching) */}
        {!isSearchOpen && (
          <nav className="nav-center">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
            <NavLink to="/watch-order" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Watch Order
            </NavLink>
          </nav>
        )}

        {/* Search Input (Expands when active) */}
        {isSearchOpen && (
          <div className="nav-search-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies & series..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') closeSearch(); }}
              className="nav-search-input"
            />
            <button onClick={closeSearch} className="icon-btn search-close-btn" aria-label="Close search">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
            </button>
          </div>
        )}

        {/* Right Tools Section */}
        <div className="nav-right">
          {!isSearchOpen && (
            <button className="icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          )}
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4.5" />
                <line x1="12" y1="2" x2="12" y2="4.5" />
                <line x1="12" y1="19.5" x2="12" y2="22" />
                <line x1="4.2" y1="4.2" x2="6" y2="6" />
                <line x1="18" y1="18" x2="19.8" y2="19.8" />
                <line x1="2" y1="12" x2="4.5" y2="12" />
                <line x1="19.5" y1="12" x2="22" y2="12" />
                <line x1="4.2" y1="19.8" x2="6" y2="18" />
                <line x1="18" y1="6" x2="19.8" y2="4.2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a.6.6 0 0 0-.8-.7A9.5 9.5 0 1 0 21.2 15.3a.6.6 0 0 0-.7-.8Z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Inline Search Results Dropdown */}
      <AnimatePresence>
        {isSearchOpen && query.trim() !== '' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="search-results-dropdown"
          >
            {results.length === 0 ? (
              <div className="search-no-results">
                No records found for "{query}".
              </div>
            ) : (
              results.map((entry, index) => (
                <div
                  key={entry.id}
                  onClick={() => handleResultClick()}
                  className="search-result-item"
                  style={{ borderBottom: index < results.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                >
                  <span className="search-result-title">{entry.title}</span>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;