import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <PageTransition>
      <div className="page-content">
        <div className="page-header" style={{ marginBottom: '3rem' }}>
          <h1>The Sacred Timeline</h1>
          <p className="subtitle" style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginTop: '1rem' }}>
            A premium reference guide for the Marvel Cinematic Universe.
          </p>
        </div>

        <p style={{ fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '700px' }}>
          The <strong>Marvel Cinematic Universe (MCU)</strong> is an American media franchise and shared
          universe centered on a series of superhero films and television series produced by Marvel Studios.
          Beginning with <em>Iron Man</em> in 2008, it has grown into the highest-grossing film franchise
          in history, spanning over 50 films and series.
        </p>

        <div style={{ margin: '3rem 0', padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>
            <strong style={{ color: 'var(--accent-color)' }}>New here?</strong> Navigate to the <Link to="/watch-order">Watch Order</Link> to see
            every MCU entry organized by release date or in-universe chronology. You can now filter by phase and track your watch progress!
          </p>
        </div>

        <h2>Sagas & Phases</h2>
        <p style={{ maxWidth: '700px' }}>
          The MCU is divided into two overarching sagas, each composed of several Phases:
        </p>
        <ul className="bullet-list" style={{ maxWidth: '700px' }}>
          <li><strong>The Infinity Saga</strong> (Phases 1–3, 2008–2019) &mdash; Follows the Avengers from their formation through the climactic battle against Thanos.</li>
          <li><strong>The Multiverse Saga</strong> (Phases 4–6, 2021–present) &mdash; Explores the fallout of Endgame, the fracturing of the multiverse, and the rise of new multiversal threats.</li>
        </ul>
        <p>
          View the full breakdown in our <Link to="/phases">Phases</Link> section.
        </p>

        <h2>Release vs. Chronological Order</h2>
        <p style={{ maxWidth: '700px' }}>
          Because the MCU features time travel, prequels, and stories happening concurrently,
          there are two primary ways to experience the story:
        </p>
        <ul className="bullet-list" style={{ maxWidth: '700px' }}>
          <li>
            <strong>Release Order</strong> &mdash; The order in which the films and series were
            released to the public. Recommended for first-time viewers as post-credit scenes are designed for this sequence.
          </li>
          <li>
            <strong>Chronological Order</strong> &mdash; The in-universe timeline order. For example,
            <em> Captain America: The First Avenger</em> is set during WWII, so it is viewed first.
          </li>
        </ul>
      </div>
    </PageTransition>
  );
};

export default Home;
