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
      <header
        className="floating-nav"
        style={{
          width: '100%',
          maxWidth: '700px',
          position: 'relative',
          zIndex: 101,
          display: 'flex',
          alignItems: 'center',
          padding: '0.55rem 0.6rem 0.55rem 1.1rem',
          borderRadius: '999px',
        }}
      >

        {/* Normal Nav State */}
        {!isSearchOpen && (
          <>
            <Link
              to="/"
              className="nav-brand"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              The <span className="text-accent">Sacred</span> Timeline
            </Link>

            <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', margin: '0 auto', padding: '0 0.5rem' }}>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                style={{ padding: '0.4rem 0.85rem', borderRadius: '999px' }}
              >
                Home
              </NavLink>
              <NavLink
                to="/watch-order"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                style={{ padding: '0.4rem 0.85rem', borderRadius: '999px' }}
              >
                Watch Order
              </NavLink>
              <NavLink
                to="/phases"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                style={{ padding: '0.4rem 0.85rem', borderRadius: '999px' }}
              >
                Phases
              </NavLink>
              <NavLink
                to="/timeline-map"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                style={{ padding: '0.4rem 0.85rem', borderRadius: '999px' }}
              >
                Map
              </NavLink>
            </nav>

            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <button
                className="icon-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                  background: 'transparent', color: '#FFFFFF', cursor: 'pointer',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
              <button
                className="icon-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                  background: 'transparent', color: '#FFFFFF', cursor: 'pointer',
                }}
              >
                {isDark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a.6.6 0 0 0-.8-.7A9.5 9.5 0 1 0 21.2 15.3a.6.6 0 0 0-.7-.8Z" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}

        {/* Search State */}
        {isSearchOpen && (
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', gap: '0.75rem', padding: '0 0.3rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies & series..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') closeSearch(); }}
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#FFFFFF' }}
            />
            <button
              onClick={closeSearch}
              className="icon-btn"
              aria-label="Close search"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                background: 'transparent', color: '#FFFFFF', cursor: 'pointer',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></svg>
            </button>
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
              background: 'rgba(10, 10, 10, 0.96)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.7)',
              overflow: 'hidden',
              maxHeight: '60vh',
              overflowY: 'auto',
              zIndex: 100
            }}
          >
            {results.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem' }}>
                No records found for "{query}".
              </div>
            ) : (
              results.map((entry, index) => (
                <div
                  key={entry.id}
                  onClick={() => handleResultClick(entry.id)}
                  style={{
                    padding: '1rem 1.5rem', borderBottom: index < results.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                    transition: 'background-color 0.15s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(192, 22, 28, 0.10)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`badge badge-${entry.type.toLowerCase()}`} style={{ fontSize: '0.6rem' }}>{entry.type}</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF' }}>{entry.title}</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>({entry.releaseYear})</span>
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