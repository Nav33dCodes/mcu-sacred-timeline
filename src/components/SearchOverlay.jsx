import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { entries } from '../data/mcuData';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Filter entries to only include Movies, Series, and Specials
  const searchableEntries = useMemo(() => {
    return entries.filter(e => ['Movie', 'Series', 'Special'].includes(e.type));
  }, []);

  // Initialize Fuse.js for powerful fuzzy searching
  const fuse = useMemo(() => {
    return new Fuse(searchableEntries, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'summary', weight: 1 }
      ],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [searchableEntries]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const fuseResults = fuse.search(query);
    setResults(fuseResults.map(result => result.item));
  }, [query, fuse]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="search-overlay" style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', justifyContent: 'center', paddingTop: '12vh' }}>
          {/* Backdrop */}
          <motion.div 
            className="search-backdrop" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
          />
          
          {/* Search Palette */}
          <motion.div 
            className="search-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'relative', background: 'var(--bg-secondary)', width: '90%', maxWidth: '640px',
              borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              display: 'flex', flexDirection: 'column', maxHeight: '70vh', border: '1px solid var(--border-color)',
              overflow: 'hidden'
            }}
          >
            {/* Input Header */}
            <div className="search-header" style={{ display: 'flex', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', alignItems: 'center', gap: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                type="text"
                placeholder="Search the archive..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="search-input"
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: 'var(--text-main)' }}
              />
              <button 
                onClick={onClose} 
                style={{ background: 'var(--border-color)', border: 'none', borderRadius: '4px', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}
              >
                ESC
              </button>
            </div>

            {/* Results Body */}
            <div className="search-results" style={{ overflowY: 'auto', padding: '0.5rem 0' }}>
              {query.trim() !== '' && results.length === 0 && (
                <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  No records found for "{query}" in the archive.
                </div>
              )}
              {query.trim() === '' && (
                <div style={{ padding: '2rem 1.5rem', textAlign: 'center', color: 'var(--text-light)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                  Begin typing to search across movies, series, and specials...
                </div>
              )}
              {results.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link 
                    to={`/entry/${entry.id}`} 
                    onClick={onClose}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      padding: '1rem 1.5rem', textDecoration: 'none',
                      borderBottom: '1px solid var(--border-light)', transition: 'background-color 0.15s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-primary)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className={`badge badge-${entry.type.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>{entry.type}</span>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {entry.title} <span style={{ color: 'var(--text-light)', fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 400, marginLeft: '0.5rem' }}>({entry.releaseYear})</span>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
