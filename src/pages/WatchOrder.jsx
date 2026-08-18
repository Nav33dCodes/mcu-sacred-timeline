import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { watchOrderGroups, entries } from '../data/mcuData';
import { useWatch } from '../context/WatchContext';
import PageTransition from '../components/PageTransition';

const WatchOrder = () => {
  const { isWatched, toggleWatched, getWatchProgress } = useWatch();
  const [expandedGroups, setExpandedGroups] = useState(
    watchOrderGroups.reduce((acc, group) => {
      acc[group.group] = true; // All expanded by default
      return acc;
    }, {})
  );

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const progress = getWatchProgress(entries.length);

  return (
    <PageTransition>
      <div className="page-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <h1>Master Watch Order</h1>
        </div>

        {/* Watch Progress Bar */}
        <div className="progress-container" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>Completion</span>
            <span style={{ color: 'var(--accent-color)' }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '99px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ height: '100%', backgroundColor: 'var(--accent-color)' }}
            />
          </div>
        </div>

        {/* Watchlist Groups */}
        <div className="watchlist-container">
          {watchOrderGroups.map((groupData) => (
            <div key={groupData.group} className="watchlist-group" style={{ marginBottom: '1.5rem' }}>
              <button 
                className="group-header-btn"
                onClick={() => toggleGroup(groupData.group)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border-color)',
                  marginBottom: '0.5rem',
                  textAlign: 'left'
                }}
              >
                <motion.span 
                  animate={{ rotate: expandedGroups[groupData.group] ? 90 : 0 }}
                  style={{ display: 'inline-block', marginRight: '0.5rem', fontSize: '0.9rem' }}
                >
                  ▶
                </motion.span>
                {groupData.group}
              </button>

              <AnimatePresence initial={false}>
                {expandedGroups[groupData.group] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul className="simple-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {groupData.entries.map((entry, index) => {
                        const watched = isWatched(entry.id);
                        return (
                          <li 
                            key={entry.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.5rem 0',
                              borderBottom: '1px solid rgba(255,255,255,0.05)',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                              opacity: watched ? 0.6 : 1
                            }}
                            onClick={() => toggleWatched(entry.id)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <span 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                marginRight: '12px',
                                fontSize: '1.1rem',
                                color: watched ? 'var(--accent-color)' : 'var(--text-muted)'
                              }}
                            >
                              {watched ? '✓' : '○'}
                            </span>
                            <span style={{ 
                              color: 'var(--text-muted)', 
                              marginRight: '12px', 
                              fontFamily: 'monospace',
                              fontSize: '0.9rem'
                            }}>
                              {String(index + 1).padStart(2, '0')}.
                            </span>
                            <span style={{ 
                              color: 'var(--text-main)', 
                              textDecoration: watched ? 'line-through' : 'none' 
                            }}>
                              {entry.title}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default WatchOrder;
