import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaPlay, FaXmark } from 'react-icons/fa6';
import PageTransition from '../components/PageTransition';
import { HOME_CONFIG, SOCIAL_LINKS } from '../config/siteConfig';
import './Home.css';

const Home = () => {
  const [activeTrailerId, setActiveTrailerId] = useState(null);

  const closeTrailer = () => setActiveTrailerId(null);

  return (
    <PageTransition>
      <div className="home-container">
        
        {/* ========================================================= */}
        {/* HERO SECTION (Cinematic Wide Layout) */}
        {/* ========================================================= */}
        <section className="hero-section">
          {/* Full Screen High-Res Background */}
          <div 
            className="hero-background-wide" 
            style={{ backgroundImage: `url(${HOME_CONFIG.wallpaperUrl}), url(/sacred_timeline_logo.jpg)` }} 
          />
          {/* Subtle gradient so text is readable but cast is visible */}
          <div className="hero-overlay-wide" />

          {/* Centered Bottom Content */}
          <div className="hero-wide-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="hero-text-center"
            >
              <p className="hero-eyebrow">{HOME_CONFIG.heroEyebrow}</p>
              <h1 className="hero-title">{HOME_CONFIG.heroTitleLine1}<br/><span>{HOME_CONFIG.heroTitleLine2}</span></h1>
              
              <div className="hero-actions">
                <Link to="/watch-order" className="btn-primary">
                  Enter Timeline
                </Link>
                <button 
                  className="btn-secondary" 
                  onClick={() => document.getElementById('media-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  View Latest Drops
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Animated Scroll Down Indicator */}
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="scroll-line" />
          </motion.div>
        </section>

        {/* ========================================================= */}
        {/* LATEST DROPS MEDIA SECTION */}
        {/* ========================================================= */}
        <section id="media-section" className="media-section">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h2>LATEST DROPS</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="media-grid">
            {HOME_CONFIG.latestDrops.map((drop, index) => (
              <motion.div 
                key={drop.id}
                className="media-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setActiveTrailerId(drop.id)}
              >
                <div className="media-thumbnail">
                  <img src={`https://img.youtube.com/vi/${drop.id}/maxresdefault.jpg`} alt={drop.title} />
                  <div className="media-play-overlay">
                    <FaPlay className="play-icon" />
                  </div>
                </div>
                <div className="media-info">
                  <h3>{drop.title}</h3>
                  <p>{drop.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* OFFICIAL POSTERS GALLERY */}
        {/* ========================================================= */}
        <section className="posters-section">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <h2>OFFICIAL POSTERS</h2>
            <div className="section-divider" />
          </motion.div>

          <div className="posters-grid">
            {HOME_CONFIG.posters.map((poster, index) => (
              <motion.div 
                key={poster.id}
                className="poster-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="poster-image-wrapper">
                  <img 
                    src={poster.url} 
                    alt={poster.title} 
                    onError={(e) => { e.target.src = '/sacred_timeline_logo.jpg' }}
                  />
                  <div className="poster-glass-shine" />
                </div>
                <div className="poster-info">
                  <p>{poster.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* FOOTER */}
        {/* ========================================================= */}
        <footer className="home-footer">
          <nav className="social-row" aria-label="Marvel on social media">
            <span className="social-label">FOLLOW MARVEL</span>
            <div className="social-icons">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Marvel on ${name}`}
                  className="social-icon"
                  title={name}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>
        </footer>

        {/* ========================================================= */}
        {/* TRAILER MODAL */}
        {/* ========================================================= */}
        <AnimatePresence>
          {activeTrailerId && (
            <motion.div 
              className="trailer-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTrailer}
            >
              <motion.div 
                className="trailer-modal-content"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-modal-btn" onClick={closeTrailer}>
                  <FaXmark size={24} />
                </button>
                <div className="video-responsive">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${activeTrailerId}?autoplay=1`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Home;