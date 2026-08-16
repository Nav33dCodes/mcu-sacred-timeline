import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok } from 'react-icons/fa6';
import PageTransition from '../components/PageTransition';
import './Home.css';
import { phases as rawPhases, entries } from '../data/mcuData';
import { useWatch } from '../context/WatchContext';

// ---------------------------------------------------------------------------
// Dynamic Database Integration
// ---------------------------------------------------------------------------
const DYNAMIC_PHASES = rawPhases.map(phase => {
  const phaseEntries = entries.filter(e => e.phase === phase.id);
  const years = phaseEntries.map(e => e.releaseYear).filter(Boolean);
  
  let era = 'Upcoming';
  if (years.length > 0) {
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    era = minYear === maxYear ? `${minYear}` : `${minYear} – ${maxYear}`;
  }
  
  const idStr = String(phase.id).length <= 2 ? String(phase.id).padStart(2, '0') : String(phase.id);
  const name = phase.name.split(':')[0]; // Just use "Phase 1" instead of "Phase 1: Assemble"

  return { id: idStr, name, era };
});

const SOCIAL_LINKS = [
  { name: 'YouTube', href: 'https://www.youtube.com/marvel', Icon: FaYoutube },
  { name: 'Instagram', href: 'https://www.instagram.com/marvel', Icon: FaInstagram },
  { name: 'Facebook', href: 'https://www.facebook.com/Marvel', Icon: FaFacebookF },
  { name: 'X', href: 'https://x.com/marvel', Icon: FaXTwitter },
  { name: 'TikTok', href: 'https://www.tiktok.com/@marvel', Icon: FaTiktok },
];

const ENTRY_POINTS = [
  {
    tag: 'RECOMMENDED',
    title: 'Watch Order',
    copy: 'Every film and series, sequenced the way the story actually unfolds — release order and chronological order, side by side.',
    to: '/watch-order',
    cta: 'Open the sequence',
  },
  {
    tag: 'ARCHIVE',
    title: 'Phase Archive',
    copy: 'Six phases, one continuity. Browse the Multiverse Saga and everything that came before it, filed and cross-referenced.',
    to: '/phases',
    cta: 'Browse the archive',
  },
  {
    tag: 'MAP',
    title: 'Timeline Map',
    copy: 'A branching view of the Sacred Timeline — see where every variant, reset, and reboot actually forks from the source.',
    to: '/timeline-map',
    cta: 'View the map',
  },
];

// ---------------------------------------------------------------------------
// Decorative: branching "Sacred Timeline" threads, drawn once + looping pulse
// ---------------------------------------------------------------------------
const TimelineThreads = ({ reduceMotion }) => {
  const paths = [
    'M -50 300 C 200 300 250 180 500 180 S 800 100 1050 100',
    'M -50 340 C 250 340 300 400 550 400 S 850 460 1050 460',
    'M -50 320 C 300 320 350 320 600 320 S 900 320 1050 320',
    'M -50 260 C 180 260 220 80 480 80 S 780 40 1050 40',
    'M -50 380 C 220 380 280 520 520 520 S 820 560 1050 560',
  ];

  return (
    <svg
      className="threads-svg"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="threadGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f2a93b" stopOpacity="0" />
          <stop offset="15%" stopColor="#f2a93b" stopOpacity="0.55" />
          <stop offset="85%" stopColor="#e8c468" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8c468" stopOpacity="0" />
        </linearGradient>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="url(#threadGold)"
          strokeWidth={i === 2 ? 2 : 1}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.15 * i, ease: 'easeInOut' }}
        />
      ))}

      {/* The "prune" — one variant thread gets severed and flares red, on loop */}
      {!reduceMotion && (
        <motion.circle
          r="4"
          fill="#c1440e"
          initial={{ offsetDistance: '0%', opacity: 0 }}
          animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 5,
            ease: 'easeInOut',
          }}
          style={{ offsetPath: `path("${paths[3]}")` }}
        />
      )}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Decorative: live "temporal designation" readout in the nav
// ---------------------------------------------------------------------------
const TemporalReadout = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // A deterministic-looking but ever-changing "case designation"
  const code = (10000 + (tick * 37) % 89999).toString().padStart(5, '0');

  return (
    <span className="temporal-readout" aria-hidden="true">
      TEMPORAL DESIGNATION <span className="readout-code">№ {code}-∞</span>
    </span>
  );
};

// ---------------------------------------------------------------------------

const Home = () => {
  const reduceMotion = useReducedMotion();
  const marqueeRef = useRef(null);
  
  const { isWatched } = useWatch();
  const totalEntries = entries.length;
  const watchedCount = entries.filter(e => isWatched(e.id)).length;
  const completionPercentage = Math.round((watchedCount / totalEntries) * 100) || 0;

  return (
    <PageTransition>
      <div className="tva-container">

        {/* ---------- Nav ---------- */}
        <header className="tva-nav">
          <div className="tva-seal">
            <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="20" y1="20" x2="20" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="20" x2="27" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>T.V.A. INDEX</span>
          </div>
          <TemporalReadout />
        </header>

        {/* ---------- Hero ---------- */}
        <section className="tva-hero">
          <div className="tva-glow-bg" />
          <TimelineThreads reduceMotion={reduceMotion} />

          <div className="tva-center">
            <motion.p
              className="tva-eyebrow"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              CASE FILE № 616-∞ · A MULTIVERSAL WATCH ORDER
            </motion.p>

            <h1 className="tva-title" aria-label="The Sacred Timeline">
              {['THE', 'SACRED', 'TIMELINE'].map((word, wi) => (
                <span className="tva-title-line" key={word}>
                  {word.split('').map((ch, ci) => (
                    <motion.span
                      key={`${word}-${ci}`}
                      className="tva-char"
                      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.6,
                        delay: 0.35 + wi * 0.15 + ci * 0.02,
                        ease: 'easeOut',
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              className="tva-subtitle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              Every film. Every series. One continuity — filed, cross-referenced,
              and finally in the right order.
            </motion.p>

            <motion.div
              className="tva-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.8 }}
            >
              <Link to="/watch-order" className="tva-btn primary-glow">
                <span>Enter the Timeline</span>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M8 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link to="/phases" className="tva-btn secondary-glow">
                Access the Archives
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="scroll-cue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            aria-hidden="true"
          >
            <span className="scroll-cue-line" />
            SCROLL
          </motion.div>
        </section>

        {/* ---------- Phase marquee ---------- */}
        <section className="phase-marquee" aria-label="Timeline phases">
          <div className="phase-marquee-track" ref={marqueeRef}>
            {[...DYNAMIC_PHASES, ...DYNAMIC_PHASES, ...DYNAMIC_PHASES].map((p, i) => (
              <div className="phase-chip" key={`${p.id}-${i}`}>
                <span className="phase-chip-id">{p.id}</span>
                <span className="phase-chip-name">{p.name}</span>
                <span className="phase-chip-era">{p.era}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Global Metrics Dashboard ---------- */}
        <section className="metrics-dash" aria-label="Global Timeline Metrics">
          <div className="metric-box">
            <span className="metric-label">TOTAL ENTITIES</span>
            <span className="metric-value">{totalEntries}</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">TIMELINE COMPLETION</span>
            <span className="metric-value highlight">{completionPercentage}%</span>
          </div>
        </section>

        {/* ---------- Entry points ---------- */}
        <section className="entry-grid">
          {ENTRY_POINTS.map((item, i) => (
            <motion.div
              key={item.title}
              className="entry-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
            >
              <span className="entry-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Link to={item.to} className="entry-link">
                {item.cta}
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M8 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* ---------- Footer ---------- */}
        <footer className="tva-footer">
          <span className="tva-stamp">FOR ALL TIME. ALWAYS.</span>

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

          <p className="footer-disclaimer">
            This is an unofficial fan resource. Marvel, the Marvel logo, and
            all associated characters are trademarks of Marvel Studios / The
            Walt Disney Company. Social links above go to Marvel's official
            channels.
          </p>
        </footer>

      </div>
    </PageTransition>
  );
};

export default Home;