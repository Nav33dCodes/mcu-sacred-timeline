import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { entries } from '../data/mcuData';

const CharacterDrawer = ({ isOpen, onClose, castName }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Find all entries this cast member appears in
  const appearances = entries.filter(e => e.cast && e.cast.includes(castName))
    .sort((a, b) => a.releaseOrder - b.releaseOrder);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="drawer-overlay" style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', justifyContent: 'flex-end' }}>
          <motion.div 
            className="drawer-backdrop" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          />
          
          <motion.div 
            className="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'relative', width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-secondary)', 
              height: '100%', borderLeft: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column',
              boxShadow: '-10px 0 25px rgba(0,0,0,0.1)'
            }}
          >
            <div className="drawer-header" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0, border: 'none', padding: 0 }}>{castName}</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>
                  MCU Appearances: {appearances.length}
                </p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.5rem' }}>✕</button>
            </div>
            
            <div className="drawer-content" style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              <div className="dossier-list">
                {appearances.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    <Link to={`/entry/${entry.id}`} onClick={onClose} className="dossier-item" style={{ padding: '0.75rem 0' }}>
                      <div className="dossier-title" style={{ fontSize: '1rem' }}>{entry.title}</div>
                      <div className="dossier-leader"></div>
                      <div className="dossier-year" style={{ fontSize: '0.85rem' }}>{entry.releaseYear}</div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CharacterDrawer;
