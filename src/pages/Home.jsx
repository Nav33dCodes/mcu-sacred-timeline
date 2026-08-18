import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaPlay, FaXmark, FaDownload } from 'react-icons/fa6';
import PageTransition from '../components/PageTransition';
import { HOME_CONFIG, SOCIAL_LINKS } from '../config/siteConfig';
import './Home.css';

const Home = () => {
  const [activeTrailerId, setActiveTrailerId] = useState(null);
  const [activePoster, setActivePoster] = useState(null);
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);

  // Auto-fading background carousel
  useEffect(() => {
    if (!HOME_CONFIG.wallpapers || HOME_CONFIG.wallpapers.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % HOME_CONFIG.wallpapers.length);
    }, 8000); // Change wallpaper every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const closeTrailer = () => setActiveTrailerId(null);
  const closePoster = () => setActivePoster(null);

  return (
    <PageTransition>
      <div className="home-container">
        
        {/* ========================================================= */}
        {/* HERO SECTION (Cinematic Carousel Layout) */}
        {/* ========================================================= */}
        <section className="hero-section">
          {/* Fading Backgrounds */}
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={currentWallpaperIndex}
              className="hero-background-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ backgroundImage: `url(${HOME_CONFIG.wallpapers[currentWallpaperIndex]}), url(/sacred_timeline_logo.jpg)` }} 
            />
          </AnimatePresence>

          {/* Cinematic Gradient */}
          <div className="hero-overlay-wide" />

          {/* Centered Bottom Content */}
          <div className="hero-wide-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="hero-text-center"
            >
              <div className="hero-actions">
                <Link to="/watch-order" className="btn-primary">
                  <span className="btn-shine"></span>
                  Enter Timeline
                </Link>
                <button 
                  className="btn-secondary" 
                  onClick={() => document.getElementById('media-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="btn-shine"></span>
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
                onClick={() => setActivePoster(poster)}
              >
                <div className="poster-image-wrapper">
                  <img 
                    src={poster.url} 
                    alt={poster.title} 
                    onError={(e) => { e.target.src = '/sacred_timeline_logo.jpg' }}
                  />
                  <div className="poster-glass-shine" />
                </div>
                {/* Text explicitly removed for a clean enterprise look */}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PROFESSIONAL ENTERPRISE FOOTER */}
        {/* ========================================================= */}
        <footer className="enterprise-footer">
          <div className="footer-content">
            
            {/* Top: Links & Socials */}
            <div className="footer-top">
              <a 
                href="https://www.marvel.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-marvel-link"
              >
                <span>OFFICIAL MARVEL WEBSITE</span>
              </a>

              <div className="footer-socials">
                {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Marvel on ${name}`}
                    className="footer-social-icon"
                    title={name}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-divider"></div>

            {/* Bottom: Developer Credits */}
            <div className="footer-bottom">
              <p className="developer-credit">
                ENGINEERED BY <span>NAVEED AHMED</span>
              </p>
              <a href="mailto:iamnaveed.cs@gmail.com" className="developer-email">
                iamnaveed.cs@gmail.com
              </a>
            </div>

          </div>
        </footer>

        {/* ========================================================= */}
        {/* TRAILER MODAL */}
        {/* ========================================================= */}
        <AnimatePresence>
          {activeTrailerId && (
            <motion.div 
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTrailer}
            >
              <motion.div 
                className="modal-content trailer-content"
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
                    src={`https://www.youtube.com/embed/${activeTrailerId.split('&')[0]}?autoplay=1${activeTrailerId.includes('&t=') ? `&start=${parseInt(activeTrailerId.split('&t=')[1])}` : ''}`} 
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

        {/* ========================================================= */}
        {/* POSTER LIGHTBOX MODAL */}
        {/* ========================================================= */}
        <AnimatePresence>
          {activePoster && (
            <motion.div 
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePoster}
            >
              <motion.div 
                className="modal-content poster-lightbox-content"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-modal-btn" onClick={closePoster}>
                  <FaXmark size={24} />
                </button>
                <img src={activePoster.url} alt={activePoster.title} className="lightbox-image" />
                <div className="lightbox-actions">
                  <a href={activePoster.url} download className="btn-primary">
                    <FaDownload size={14} style={{ marginRight: '0.5rem' }} />
                    Download Poster
                  </a>
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