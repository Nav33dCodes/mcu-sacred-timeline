import DataTable from '../components/DataTable';
import { entries } from '../data/mcuData';
import { useMemo } from 'react';

const SeriesList = () => {
  const series = useMemo(() => {
    return entries
      .filter(entry => entry.type === 'Series' || entry.type === 'Special')
      .sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Type', key: 'type' },
    { header: 'Year', key: 'releaseYear' },
    { header: 'Phase', key: 'phase' }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Series & Specials</h1>
        <p>A complete alphabetical list of MCU Disney+ series and Marvel Studios Special Presentations.</p>
      </div>
      <DataTable columns={columns} data={series} isEntry={true} />
    </div>
  );
};

export default SeriesList;
