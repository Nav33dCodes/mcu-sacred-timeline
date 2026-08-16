import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useWatch } from '../context/WatchContext';
import { entries } from '../data/mcuData';

const Home = () => {
  const { isWatched } = useWatch();
  
  const totalEntries = entries.length;
  // Calculate watched count by checking each entry against isWatched
  const watchedCount = entries.filter(e => isWatched(e.id)).length;
  
  // Get upcoming entries (those with releaseYear >= 2025)
  const upcomingEntries = entries
    .filter(e => e.releaseYear >= 2025)
    .sort((a, b) => a.releaseOrder - b.releaseOrder)
    .slice(0, 3);

  return (
    <PageTransition>
      <div className="home-dashboard">
        
        {/* HERO BANNER */}
        <div className="hero-banner">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              The Sacred Timeline
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              The definitive, interactive database and timeline tracker for the Marvel Cinematic Universe.
            </motion.p>
          </div>
        </div>

        {/* S.H.I.E.L.D GLOBAL STATS */}
        <div className="dashboard-section">
          <h2 className="section-title">S.H.I.E.L.D Database Status</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{totalEntries}</span>
              <span className="stat-label">Total Classified Entries</span>
            </div>
            <div className="stat-card">
              <span className="stat-value text-accent">Phase 6</span>
              <span className="stat-label">Current Timeline Era</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{watchedCount} / {totalEntries}</span>
              <span className="stat-label">Your Watch Progress</span>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${Math.min((watchedCount / totalEntries) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* PORTAL NAVIGATION */}
        <div className="dashboard-section">
          <h2 className="section-title">Access the Archives</h2>
          <div className="portal-grid">
            <Link to="/watch-order" className="portal-card watch-order-portal">
              <div className="portal-content">
                <h3>The Watch Order</h3>
                <p>Track your progress through the definitive timeline.</p>
              </div>
              <div className="portal-glow"></div>
            </Link>
            
            <Link to="/phases" className="portal-card phases-portal">
              <div className="portal-content">
                <h3>The Phases Database</h3>
                <p>Explore the complete Infinity and Multiverse sagas.</p>
              </div>
              <div className="portal-glow"></div>
            </Link>
          </div>
        </div>

        {/* UPCOMING RELEASES */}
        {upcomingEntries.length > 0 && (
          <div className="dashboard-section">
            <h2 className="section-title">Up Next on the Timeline</h2>
            <div className="upcoming-grid">
              {upcomingEntries.map(entry => (
                <Link to={`/entry/${entry.id}`} key={entry.id} className="upcoming-card">
                  <div className="upcoming-meta">
                    <span className="badge" style={{ backgroundColor: 'var(--text-main)', color: 'var(--bg-primary)' }}>
                      Coming Soon
                    </span>
                    <span className={`badge badge-${entry.type.toLowerCase()}`}>{entry.type}</span>
                  </div>
                  <h3>{entry.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
};

export default Home;
