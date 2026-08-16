import DataTable from '../components/DataTable';
import { entries } from '../data/mcuData';
import { useMemo } from 'react';

const MoviesList = () => {
  const movies = useMemo(() => {
    return entries
      .filter(entry => entry.type === 'Movie')
      .sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Year', key: 'releaseYear' },
    { header: 'Phase', key: 'phase' }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Movies</h1>
        <p>A complete alphabetical list of MCU theatrical films.</p>
      </div>
      <DataTable columns={columns} data={movies} isEntry={true} />
    </div>
  );
};

export default MoviesList;
