import React, { memo } from 'react';

import styles from './input.css';

const Input = ({ placeholder, value, onChange }) => (
  <input value={value} onChange={onChange} placeholder={placeholder} className={styles.input} />
);

export default memo(Input);
