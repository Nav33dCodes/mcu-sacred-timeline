import { Link } from 'react-router-dom';

const DataTable = ({ columns, data, isEntry }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col, colIdx) => (
              <td key={colIdx}>
                {/* Title column: render as link */}
                {isEntry && col.key === 'title' ? (
                  <Link to={`/entry/${row.id}`}>{row[col.key]}</Link>
                ) : col.key === 'type' ? (
                  <span className={`badge badge-${row[col.key].toLowerCase()}`}>
                    {row[col.key]}
                  </span>
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
