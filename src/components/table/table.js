import React from 'react';

import stlyes from './table.css';

const Table = ({ data, hasHeader }) => (
  <div className={stlyes.container}>
    {data.map((row, index) => (
      <div className={`${stlyes.row} ${hasHeader && index === 0 ? stlyes.header : ''}`}>
        {row.map((entry, i) => (
          <div className={stlyes.entry} key={`${i}-${entry}`}>
            {entry}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Table;
