import DataTable from '../components/DataTable';
import { characters } from '../data/mcuData';
import { useMemo } from 'react';

const CharactersList = () => {
  const sortedCharacters = useMemo(() => {
    return [...characters].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const columns = [
    { header: 'Character', key: 'name' },
    { header: 'Real Name', key: 'realName' },
    { header: 'First Appearance', key: 'firstAppearance' },
    { header: 'Description', key: 'description' }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Characters</h1>
        <p>A reference list of major characters in the Marvel Cinematic Universe.</p>
      </div>
      <DataTable columns={columns} data={sortedCharacters} isEntry={false} />
    </div>
  );
};

export default CharactersList;
