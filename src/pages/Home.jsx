import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { useWatch } from '../context/WatchContext';
import { entries } from '../data/mcuData';

const Home = () => {
  const { isWatched } = useWatch();
  
  const totalEntries = entries.length;
  const watchedCount = entries.filter(e => isWatched(e.id)).length;
  
  // Get Phase 6 upcoming entries
  const upcomingPhase6 = entries
    .filter(e => e.phase === 6)
    .sort((a, b) => a.releaseOrder - b.releaseOrder);

  return (
    <PageTransition>
      <div className="command-center-layout">
        
        {/* LEFT FLANK: DOOMSDAY */}
        <aside className="flank left-flank">
          <div className="flank-header doomsday-theme">
            <h2>Phase 6 Protocol</h2>
            <span className="flank-badge">Classified</span>
          </div>
          <div className="poster-container">
            <img src="https://media.giphy.com/media/xT9IgusfDcqpPFzO0g/giphy.gif" alt="Avengers Assemble" className="flank-poster" />
            <div className="poster-glitch-overlay"></div>
          </div>
          <div className="flank-content">
            <h3 className="doom-text">Avengers: Doomsday</h3>
            <p className="lore-text">The Multiverse is collapsing. A new threat emerges from the ashes of the Sacred Timeline. Prepare for the arrival of Victor Von Doom.</p>
            <div className="countdown-box">
              <span className="countdown-label">Target Release</span>
              <span className="countdown-value">May 2026</span>
            </div>
          </div>
        </aside>

        {/* CENTRAL CORE */}
        <main className="central-core">
          <div className="core-hero">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="core-title"
            >
              The Sacred Timeline
            </motion.h1>
            <p className="core-subtitle">Advanced Multiverse Tracking System</p>
          </div>

          <div className="core-dashboard">
            <div className="metrics-row">
              <div className="metric-box">
                <span className="metric-data">{totalEntries}</span>
                <span className="metric-name">Total Entities</span>
              </div>
              <div className="metric-box highlight-box">
                <span className="metric-data">{Math.round((watchedCount / totalEntries) * 100)}%</span>
                <span className="metric-name">Completion</span>
              </div>
              <div className="metric-box">
                <span className="metric-data">Ph 6</span>
                <span className="metric-name">Current Era</span>
              </div>
            </div>

            <div className="core-navigation">
              <Link to="/watch-order" className="nav-tile">
                <div className="tile-bg watch-bg"></div>
                <div className="tile-content">
                  <h3>Master Timeline</h3>
                  <p>Access the chronological watch order</p>
                </div>
              </Link>
              <Link to="/phases" className="nav-tile">
                <div className="tile-bg phases-bg"></div>
                <div className="tile-content">
                  <h3>Database</h3>
                  <p>Browse by Phase & Saga</p>
                </div>
              </Link>
            </div>

            <h3 className="sub-header">Upcoming Intel (Phase 6)</h3>
            <div className="upcoming-feed">
              {upcomingPhase6.slice(0, 4).map(entry => (
                <Link to={`/entry/${entry.id}`} key={entry.id} className="feed-item">
                  <div className="feed-meta">
                    <span className="feed-date">{entry.releaseYear}</span>
                    <span className={`badge badge-${entry.type.toLowerCase()}`}>{entry.type}</span>
                  </div>
                  <h4 className="feed-title">{entry.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        </main>

        {/* RIGHT FLANK: SECRET WARS & F4 */}
        <aside className="flank right-flank">
          <div className="flank-header secret-wars-theme">
            <h2>The Climax</h2>
            <span className="flank-badge warning">Critical</span>
          </div>
          <div className="flank-content">
            <h3 className="secret-text">Avengers: Secret Wars</h3>
            <p className="lore-text">The culmination of the Multiverse Saga. Realities will collide. Only one timeline will survive the incursions.</p>
            <div className="countdown-box">
              <span className="countdown-label">Target Release</span>
              <span className="countdown-value">May 2027</span>
            </div>
          </div>
          
          <hr className="flank-divider" />
          
          <div className="flank-content">
            <h3 className="f4-text">The Fantastic Four</h3>
            <p className="lore-text">First Steps into a retro-futuristic universe. The First Family arrives.</p>
            <div className="countdown-box">
              <span className="countdown-label">Target Release</span>
              <span className="countdown-value">July 2025</span>
            </div>
          </div>
        </aside>

      </div>
    </PageTransition>
  );
};

export default Home;
