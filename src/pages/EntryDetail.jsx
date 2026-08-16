import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { entries } from '../data/mcuData';
import { useWatch } from '../context/WatchContext';
import PageTransition from '../components/PageTransition';
import CharacterDrawer from '../components/CharacterDrawer';

const EntryDetail = () => {
  const { id } = useParams();
  const entryIndex = entries.findIndex(e => e.id === id);
  const entry = entries[entryIndex];
  
  const { isWatched, toggleWatched } = useWatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCast, setSelectedCast] = useState('');

  if (!entry) {
    return (
      <PageTransition>
        <div className="page-content">
          <h1>Entry Not Found</h1>
          <Link to="/">Return Home</Link>
        </div>
      </PageTransition>
    );
  }

  const prevEntry = entryIndex > 0 ? entries[entryIndex - 1] : null;
  const nextEntry = entryIndex < entries.length - 1 ? entries[entryIndex + 1] : null;
  
  const watched = isWatched(entry.id);

  const handleCastClick = (actor) => {
    setSelectedCast(actor);
    setDrawerOpen(true);
  };

  return (
    <PageTransition>
      <div className="page-content">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          {entry.title}
        </div>

        {/* Infobox */}
        <div className="infobox">
          <div className="infobox-title">{entry.title}</div>
          <table>
            <tbody>
              <tr>
                <th>Type</th>
                <td>{entry.type}</td>
              </tr>
              <tr>
                <th>Phase</th>
                <td>{entry.phase}</td>
              </tr>
              <tr>
                <th>Release Year</th>
                <td>{entry.releaseYear}</td>
              </tr>
              {entry.director && (
                <tr>
                  <th>Director</th>
                  <td>{entry.director}</td>
                </tr>
              )}
              <tr>
                <th>Chronological #</th>
                <td>{entry.chronologicalOrder}</td>
              </tr>
              <tr>
                <th>Release #</th>
                <td>{entry.releaseOrder}</td>
              </tr>
            </tbody>
          </table>
          
          <button 
            onClick={() => toggleWatched(entry.id)}
            style={{ 
              width: '100%', marginTop: '1.5rem', padding: '0.75rem', borderRadius: '6px',
              border: `1px solid ${watched ? 'var(--accent-color)' : 'var(--border-color)'}`,
              background: watched ? 'var(--accent-color)' : 'transparent',
              color: watched ? 'var(--bg-primary)' : 'var(--text-main)',
              fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s', display: 'flex', justifyContent: 'center', gap: '0.5rem', alignItems: 'center'
            }}
          >
            {watched ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Watched
              </>
            ) : (
              'Mark as Watched'
            )}
          </button>
        </div>

        {/* Main Content */}
        <h1>{entry.title}</h1>
        <p className="subtitle">{entry.releaseYear} • Phase {entry.phase}</p>
        
        <h2 style={{ marginTop: '2rem' }}>Synopsis</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px' }}>{entry.summary}</p>
        
        <h2 style={{ marginTop: '2.5rem' }}>MCU Importance</h2>
        <p style={{ maxWidth: '600px' }}>{entry.mcuImportance}</p>
        
        {/* Cast Section */}
        {entry.cast && entry.cast.length > 0 && (
          <>
            <h2 style={{ marginTop: '2.5rem' }}>Major Cast</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '600px' }}>
              {entry.cast.map(actor => (
                <button 
                  key={actor}
                  onClick={() => handleCastClick(actor)}
                  style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                    padding: '0.5rem 1rem', borderRadius: '99px', color: 'var(--text-main)',
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500,
                    cursor: 'pointer', transition: 'border-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--text-light)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  {actor}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="timeline-nav">
          {prevEntry ? (
            <div className="timeline-nav-item prev">
              <span className="label">Previous in Release Order</span>
              <Link to={`/entry/${prevEntry.id}`}>&larr; {prevEntry.title}</Link>
            </div>
          ) : (
            <div></div>
          )}

          {nextEntry && (
            <div className="timeline-nav-item next" style={{ textAlign: 'right' }}>
              <span className="label">Next in Release Order</span>
              <Link to={`/entry/${nextEntry.id}`}>{nextEntry.title} &rarr;</Link>
            </div>
          )}
        </div>
      </div>
      
      <CharacterDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} castName={selectedCast} />
    </PageTransition>
  );
};

export default EntryDetail;
