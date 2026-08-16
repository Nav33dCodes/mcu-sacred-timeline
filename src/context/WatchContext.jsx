import { createContext, useState, useEffect, useContext } from 'react';

const WatchContext = createContext();

export const useWatch = () => {
  return useContext(WatchContext);
};

export const WatchProvider = ({ children }) => {
  const [watched, setWatched] = useState(() => {
    try {
      const stored = localStorage.getItem('mcu_watched');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mcu_watched', JSON.stringify(watched));
  }, [watched]);

  const toggleWatched = (entryId) => {
    setWatched((prev) => 
      prev.includes(entryId)
        ? prev.filter((id) => id !== entryId)
        : [...prev, entryId]
    );
  };

  const isWatched = (entryId) => watched.includes(entryId);

  const getWatchProgress = (totalEntries) => {
    if (totalEntries === 0) return 0;
    return Math.round((watched.length / totalEntries) * 100);
  };

  return (
    <WatchContext.Provider value={{ watched, toggleWatched, isWatched, getWatchProgress }}>
      {children}
    </WatchContext.Provider>
  );
};
