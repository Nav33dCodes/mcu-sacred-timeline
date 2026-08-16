import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { entries, phases } from '../data/mcuData';
import PageTransition from '../components/PageTransition';

const PhasesList = () => {
  const groupedData = useMemo(() => {
    const grouped = {};
    phases.forEach(phase => {
      grouped[phase.id] = {
        phaseInfo: phase,
        entries: entries.filter(e => e.phase === phase.id).sort((a, b) => {
          if (a.releaseYear !== b.releaseYear) return a.releaseYear - b.releaseYear;
          return a.releaseOrder - b.releaseOrder;
        })
      };
    });
    return grouped;
  }, []);

  const getBadgeClass = (type) => {
    switch(type) {
      case 'Movie': return 'badge-movie';
      case 'Series': return 'badge-series';
      case 'Special': return 'badge-special';
      default: return 'badge-outline';
    }
  };

  return (
    <PageTransition>
      <div className="page-content">
        {phases.map((phase, phaseIndex) => {
          const group = groupedData[phase.id];
          if (!group || group.entries.length === 0) return null;

          return (
            <motion.div 
              key={phase.id} 
              className="phase-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: phaseIndex * 0.1 }}
            >
              <div className="phase-header">
                <h2>{phase.name}</h2>
                <p className="subtitle">{phase.description}</p>
              </div>
              
              <div className="dossier-list">
                {group.entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link to={`/entry/${entry.id}`} className="dossier-item">
                      <div className="dossier-title">{entry.title}</div>
                      <div className="dossier-leader"></div>
                      {((entry.releaseYear > 2026) || (entry.releaseYear === 2026 && entry.releaseOrder >= 63)) && (
                        <div className="badge dossier-badge" style={{ backgroundColor: 'var(--text-main)', color: 'var(--bg-primary)', borderColor: 'var(--text-main)', marginRight: '0.5rem', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                          Coming Soon
                        </div>
                      )}
                      <div className={`badge dossier-badge ${getBadgeClass(entry.type)}`}>
                        {entry.type}
                      </div>
                      <div className="dossier-year">{entry.releaseYear}</div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </PageTransition>
  );
};

export default PhasesList;
