import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useWatch } from '../context/WatchContext';
import { entries } from '../data/mcuData';

const Home = () => {
  const { isWatched } = useWatch();
  
  const totalEntries = entries.length;
  const watchedCount = entries.filter(e => isWatched(e.id)).length;
  const completionPercentage = Math.round((watchedCount / totalEntries) * 100) || 0;
  
  const upcomingEntries = entries
    .filter(e => e.releaseYear >= 2025)
    .sort((a, b) => a.releaseOrder - b.releaseOrder)
    .slice(0, 5); // Take 5 for a nice horizontal row

  return (
    <PageTransition>
      <div className="full-bleed-home">
        
        {/* Full-Width Cinematic Hero Banner */}
        <section className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-vignette"></div>
          <div className="hero-content">
            <motion.div 
              className="hero-logo-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <img src="/sacred_timeline_logo.jpg" alt="Sacred Timeline" className="hero-icon" />
              <h1 className="hero-title">The Sacred Timeline</h1>
            </motion.div>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              The definitive, interactive database for the Marvel Cinematic Universe.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ marginTop: '2.5rem' }}
            >
              <Link to="/watch-order" className="hero-cta">
                Access Master Timeline
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Home Content Body (Padded) */}
        <div className="home-body">
          
          {/* Metrics Row */}
          <section className="content-row">
            <h2 className="row-header">S.H.I.E.L.D Global Metrics</h2>
            <div className="metrics-cards">
              <div className="metrics-card">
                <span className="metrics-value">{totalEntries}</span>
                <span className="metrics-label">Total Entries</span>
              </div>
              <div className="metrics-card highlight">
                <span className="metrics-value">{completionPercentage}%</span>
                <span className="metrics-label">Your Completion</span>
              </div>
              <div className="metrics-card">
                <span className="metrics-value">Phase 6</span>
                <span className="metrics-label">Current Era</span>
              </div>
            </div>
          </section>

          {/* Quick Navigation Row */}
          <section className="content-row">
            <h2 className="row-header">Explore the Archives</h2>
            <div className="navigation-cards">
              <Link to="/watch-order" className="nav-card watch-card">
                <div className="nav-overlay"></div>
                <div className="nav-content">
                  <h3>Master Watch Order</h3>
                  <p>Track your chronological or release progress</p>
                </div>
              </Link>
              <Link to="/phases" className="nav-card phases-card">
                <div className="nav-overlay"></div>
                <div className="nav-content">
                  <h3>The Phases Database</h3>
                  <p>Browse the Infinity and Multiverse sagas</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Horizontal Scrolling Upcoming Row */}
          <section className="content-row">
            <h2 className="row-header">Upcoming Intel</h2>
            <div className="upcoming-horizontal-scroll">
              {upcomingEntries.map(entry => (
                <Link to={`/entry/${entry.id}`} key={entry.id} className="upcoming-poster-card">
                  <div className="upcoming-meta">
                    <span className="upcoming-year">{entry.releaseYear}</span>
                    <span className={`badge badge-${entry.type.toLowerCase()}`}>{entry.type}</span>
                  </div>
                  <h4 className="upcoming-title">{entry.title}</h4>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
