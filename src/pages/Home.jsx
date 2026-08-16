import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import './Home.css';

// ---------------------------------------------------------------------------
// Data — edit these to match your real routes / content
// ---------------------------------------------------------------------------
const PHASES = [
  { id: '01', name: 'Phase One', era: '2008 – 2012' },
  { id: '02', name: 'Phase Two', era: '2013 – 2015' },
  { id: '03', name: 'Phase Three', era: '2016 – 2019' },
  { id: '04', name: 'Phase Four', era: '2021 – 2022' },
  { id: '05', name: 'Phase Five', era: '2023 – 2024' },
  { id: '06', name: 'Phase Six', era: '2025 – 2027' },
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
    to: '/phases',
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
            {[...PHASES, ...PHASES].map((p, i) => (
              <div className="phase-chip" key={`${p.id}-${i}`}>
                <span className="phase-chip-id">{p.id}</span>
                <span className="phase-chip-name">{p.name}</span>
                <span className="phase-chip-era">{p.era}</span>
              </div>
            ))}
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

        {/* ---------- Footer stamp ---------- */}
        <footer className="tva-footer">
          <span className="tva-stamp">FOR ALL TIME. ALWAYS.</span>
        </footer>

      </div>
    </PageTransition>
  );
};

export default Home;
