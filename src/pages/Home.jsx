import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaPlay, FaXmark, FaDownload, FaCalendarDays } from 'react-icons/fa6';
import PageTransition from '../components/PageTransition';
import { HOME_CONFIG, SOCIAL_LINKS } from '../config/siteConfig';
import './Home.css';

// ============================================================
// COUNTDOWN TIMER COMPONENT
// ============================================================
const RELEASE_DATE = new Date('2026-12-18T00:00:00');

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = RELEASE_DATE - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <motion.div
      className="countdown-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
    >
      <p className="countdown-label">ARRIVES IN THEATERS</p>
      <div className="countdown-grid">
        {[
          { value: pad(timeLeft.days), label: 'DAYS' },
          { value: pad(timeLeft.hours), label: 'HRS' },
          { value: pad(timeLeft.minutes), label: 'MIN' },
          { value: pad(timeLeft.seconds), label: 'SEC' },
        ].map(({ value, label }, i) => (
          <div key={label} className="countdown-block">
            <div className="countdown-value">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {value}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="countdown-unit">{label}</span>
            {i < 3 && <span className="countdown-sep">:</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================
// FLOATING PARTICLES COMPONENT
// ============================================================
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    duration: `${Math.random() * 12 + 8}s`,
    delay: `${Math.random() * 8}s`,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================
// 3D TILT POSTER CARD COMPONENT
// ============================================================
const TiltPosterCard = ({ poster, onClick }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="tilt-poster-card"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(poster)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div className="tilt-poster-inner">
        <img
          src={poster.url}
          alt={poster.title}
          className="tilt-poster-img"
          onError={(e) => { e.target.src = '/sacred_timeline_logo.jpg'; }}
        />
        <div className="tilt-poster-shine" />
        <div className="tilt-poster-overlay">
          <span className="tilt-poster-cta">VIEW FULL POSTER</span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// MAIN HOME COMPONENT
// ============================================================
const Home = () => {
  const [activeTrailerId, setActiveTrailerId] = useState(null);
  const [activePoster, setActivePoster] = useState(null);
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);
  const carouselRef = useRef(null);

  // Auto-fading background carousel
  useEffect(() => {
    if (!HOME_CONFIG.wallpapers || HOME_CONFIG.wallpapers.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % HOME_CONFIG.wallpapers.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const closeTrailer = () => setActiveTrailerId(null);
  const closePoster = () => setActivePoster(null);

  const isLogo = HOME_CONFIG.wallpapers[currentWallpaperIndex]?.includes('logo');

  // Staggered text variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <PageTransition>
      <div className="home-container">

        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section className="hero-section">

          {/* Floating Particles */}
          <FloatingParticles />

          {/* Fading Backgrounds */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentWallpaperIndex}
              className="hero-background-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{
                backgroundImage: `url(${HOME_CONFIG.wallpapers[currentWallpaperIndex]})`,
                backgroundSize: isLogo ? '60%' : 'cover',
                backgroundPosition: isLogo ? 'center' : 'top center',
                backgroundColor: 'black',
              }}
            />
          </AnimatePresence>

          {/* Cinematic Vignette Gradient */}
          <div className="hero-overlay-wide" />

          {/* Wallpaper Dot Indicators */}
          <div className="wallpaper-dots">
            {HOME_CONFIG.wallpapers.map((_, i) => (
              <button
                key={i}
                className={`wallpaper-dot ${i === currentWallpaperIndex ? 'active' : ''}`}
                onClick={() => setCurrentWallpaperIndex(i)}
                aria-label={`Wallpaper ${i + 1}`}
              />
            ))}
          </div>

          {/* Bottom Bar — compact, does NOT block the poster */}
          <div className="hero-bottom-bar">

            {/* LEFT — Title */}
            <div className="hero-bar-left">
              <motion.p
                className="hero-eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {HOME_CONFIG.heroEyebrow}
              </motion.p>

              <motion.div
                className="hero-title-block"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[HOME_CONFIG.heroTitleLine1, HOME_CONFIG.heroTitleLine2].map((line, li) => (
                  <div key={li} className="hero-title-line">
                    {line.split('').map((char, ci) => (
                      <motion.span
                        key={`${li}-${ci}`}
                        variants={wordVariants}
                        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* CENTER — Countdown */}
            <div className="hero-bar-center">
              <CountdownTimer />
            </div>

            {/* RIGHT — CTA Buttons */}
            <div className="hero-bar-right">
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <Link to="/watch-order" className="btn-primary">
                  <span className="btn-shine" />
                  Enter Timeline
                </Link>
                <button
                  className="btn-secondary"
                  onClick={() => document.getElementById('media-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="btn-shine" />
                  View Latest Drops
                </button>
              </motion.div>
            </div>

          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="scroll-line" />
          </motion.div>

        </section>

        {/* ========================================================= */}
        {/* RELEASE DATE BANNER */}
        {/* ========================================================= */}
        <motion.div
          className="release-banner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="release-banner-inner">
            <FaCalendarDays className="release-icon" />
            <span className="release-text">IN THEATERS WORLDWIDE</span>
            <span className="release-sep">—</span>
            <span className="release-date">DECEMBER 18, 2026</span>
            <span className="release-sep">—</span>
            <span className="release-text">IMAX · DOLBY · 4DX</span>
          </div>
          <div className="release-banner-glow" />
        </motion.div>

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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => setActiveTrailerId(drop.id)}
              >
                {/* Trailer Number Badge */}
                <div className="trailer-badge">TRAILER {String(index + 1).padStart(2, '0')}</div>

                <div className="media-thumbnail">
                  <img src={`https://img.youtube.com/vi/${drop.id}/maxresdefault.jpg`} alt={drop.title} />
                  <div className="media-play-overlay">
                    <div className="play-btn-ring">
                      <FaPlay className="play-icon" />
                    </div>
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
        {/* OFFICIAL POSTERS GALLERY — 3D Tilt Carousel */}
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

          <div className="posters-carousel" ref={carouselRef}>
            {HOME_CONFIG.posters.map((poster, index) => (
              <motion.div
                key={poster.id}
                initial={{ opacity: 0, scale: 0.9, x: 40 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <TiltPosterCard poster={poster} onClick={setActivePoster} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PROFESSIONAL ENTERPRISE FOOTER */}
        {/* ========================================================= */}
        <footer className="enterprise-footer">
          <div className="footer-content">
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
            <div className="footer-divider" />
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
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-modal-btn" onClick={closeTrailer}>
                  <FaXmark size={24} />
                </button>
                <div className="video-responsive">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeTrailerId.split('&')[0]}?autoplay=1`}
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
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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