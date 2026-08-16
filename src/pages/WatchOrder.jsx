import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { entries } from '../data/mcuData';
import { useWatch } from '../context/WatchContext';
import PageTransition from '../components/PageTransition';
import AnimatedCheckbox from '../components/AnimatedCheckbox';

const WatchOrder = () => {
  const [isChronological, setIsChronological] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [phaseFilter, setPhaseFilter] = useState('All');
  
  const { isWatched, toggleWatched, getWatchProgress } = useWatch();

  const sortedAndFilteredData = useMemo(() => {
    let filtered = [...entries];
    
    // Apply Format Filter
    if (typeFilter !== 'All') {
      filtered = filtered.filter(e => e.type === typeFilter);
    }
    
    // Apply Phase Filter
    if (phaseFilter !== 'All') {
      filtered = filtered.filter(e => e.phase === phaseFilter);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (isChronological) {
        return a.chronologicalOrder - b.chronologicalOrder;
      }
      return a.releaseOrder - b.releaseOrder;
    });
  }, [isChronological, typeFilter, phaseFilter]);

  const progress = getWatchProgress(entries.length);

  return (
    <PageTransition>
      <div className="page-content">
        <div className="page-header">
          <h1>Watch Order</h1>
          <p className="subtitle">Trace the timeline of the MCU through its cinematic history.</p>
        </div>

        {/* Watch Progress Bar */}
        <div className="progress-container" style={{ margin: '2rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>Saga Completion</span>
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

        {/* Advanced Filters */}
        <div className="filters-container" style={{ 
          display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', 
          padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' 
        }}>
          {/* Format Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: '80px', fontWeight: 600 }}>Format</span>
            <div className="filter-scroll" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', flex: 1, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {['All', 'Movie', 'Series', 'Special'].map(filter => (
                <button 
                  key={filter}
                  className="badge badge-outline filter-pill"
                  onClick={() => setTypeFilter(filter)}
                  style={{ 
                    cursor: 'pointer', padding: '0.4rem 1rem', flexShrink: 0,
                    backgroundColor: typeFilter === filter ? 'var(--text-main)' : 'transparent',
                    color: typeFilter === filter ? 'var(--bg-primary)' : 'var(--text-muted)',
                    borderColor: typeFilter === filter ? 'var(--text-main)' : 'var(--border-color)'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          {/* Phase Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: '80px', fontWeight: 600 }}>Phase</span>
            <div className="filter-scroll" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', flex: 1, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {['All', 1, 2, 3, 'defenders', 4, 5, 6].map(filter => {
                const isSelected = phaseFilter === filter;
                let label = filter === 'All' ? 'All Phases' : filter === 'defenders' ? 'The Defenders Saga' : `Phase ${filter}`;
                
                return (
                  <button 
                    key={filter}
                    className="badge badge-outline filter-pill"
                    onClick={() => setPhaseFilter(filter)}
                    style={{ 
                      cursor: 'pointer', padding: '0.4rem 1rem', flexShrink: 0,
                      backgroundColor: isSelected ? 'var(--text-main)' : 'transparent',
                      color: isSelected ? 'var(--bg-primary)' : 'var(--text-muted)',
                      borderColor: isSelected ? 'var(--text-main)' : 'var(--border-color)'
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sorting Toggles */}
        <div className="toggle-group">
          <div className="toggle-wrapper">
            <button
              className={`toggle-btn${!isChronological ? ' active' : ''}`}
              onClick={() => setIsChronological(false)}
            >
              Release Order
            </button>
            <button
              className={`toggle-btn${isChronological ? ' active' : ''}`}
              onClick={() => setIsChronological(true)}
            >
              Chronological Order
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {sortedAndFilteredData.map((entry, index) => (
            <motion.div 
              key={entry.id} 
              className={`timeline-node ${isWatched(entry.id) ? 'watched-node' : ''}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <div className="timeline-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Link to={`/entry/${entry.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
                    <div className="timeline-details">
                      <h3 className="timeline-title" style={{ textDecoration: isWatched(entry.id) ? 'line-through' : 'none', opacity: isWatched(entry.id) ? 0.5 : 1 }}>
                        {entry.title}
                      </h3>
                      <div className="timeline-meta" style={{ opacity: isWatched(entry.id) ? 0.5 : 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {(entry.releaseYear > 2026 || (entry.releaseYear === 2026 && entry.releaseOrder >= 63)) && (
                          <span className="badge" style={{ backgroundColor: 'var(--text-main)', color: 'var(--bg-primary)', borderColor: 'var(--text-main)', padding: '0.2rem 0.6rem', whiteSpace: 'nowrap', fontWeight: 'bold' }}>Coming Soon</span>
                        )}
                        <span className={`badge badge-${entry.type.toLowerCase()}`} style={{ whiteSpace: 'nowrap' }}>{entry.type}</span>
                        <span className="timeline-year">{entry.releaseYear}</span>
                        <span className="timeline-order">
                          {isChronological ? `#${entry.chronologicalOrder}` : `#${entry.releaseOrder}`}
                        </span>
                      </div>
                      <p className="timeline-summary" style={{ opacity: isWatched(entry.id) ? 0.5 : 1 }}>{entry.summary}</p>
                    </div>
                  </Link>
                  
                  <AnimatedCheckbox 
                    isChecked={isWatched(entry.id)} 
                    onClick={() => toggleWatched(entry.id)} 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {sortedAndFilteredData.length === 0 && (
          <p style={{textAlign: 'center', marginTop: '2rem'}}>No entries match this filter.</p>
        )}
      </div>
    </PageTransition>
  );
};

export default WatchOrder;
