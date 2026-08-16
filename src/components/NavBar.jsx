import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { entries } from '../data/mcuData';

const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

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
    return entries.filter(e => ['Movie', 'Series', 'Special'].includes(e.type));
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

  const handleResultClick = (id) => {
    navigate(`/entry/${id}`);
    closeSearch();
  };

  return (
    <div className="nav-wrapper" style={{ position: 'sticky', top: '1.5rem', zIndex: 100, padding: '0 1.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Floating Navbar Pill */}
      <header className="floating-nav" style={{ width: '100%', maxWidth: '850px', position: 'relative', zIndex: 101 }}>
        
        {/* Normal Nav State */}
        {!isSearchOpen && (
          <>
            <Link to="/" className="nav-brand">
              The <span className="text-accent">Sacred</span> Timeline
            </Link>
            
            <nav className="nav-links">
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
              <NavLink to="/watch-order" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Watch Order</NavLink>
              <NavLink to="/phases" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Phases</NavLink>
              <NavLink to="/timeline-map" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Map</NavLink>
            </nav>
            
            <div className="nav-actions">
              <button className="icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search">Search</button>
              <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? 'Light' : 'Dark'}
              </button>
            </div>
          </>
        )}

        {/* Search State */}
        {isSearchOpen && (
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '1rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies & series..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') closeSearch(); }}
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-main)' }}
            />
            <button onClick={closeSearch} className="icon-btn" style={{ fontSize: '0.75rem' }}>Close</button>
          </div>
        )}
      </header>

      {/* Inline Search Results Dropdown */}
      <AnimatePresence>
        {isSearchOpen && query.trim() !== '' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              width: '100%',
              maxWidth: '680px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              maxHeight: '60vh',
              overflowY: 'auto',
              zIndex: 100
            }}
          >
            {results.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                No records found for "{query}".
              </div>
            ) : (
              results.map((entry, index) => (
                <div 
                  key={entry.id}
                  onClick={() => handleResultClick(entry.id)}
                  style={{ 
                    padding: '1rem 1.5rem', borderBottom: index < results.length - 1 ? '1px solid var(--border-light)' : 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`badge badge-${entry.type.toLowerCase()}`} style={{ fontSize: '0.6rem' }}>{entry.type}</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>{entry.title}</span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>({entry.releaseYear})</span>
                  </div>
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
