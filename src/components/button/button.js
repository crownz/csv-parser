import React, { memo } from 'react';

import styles from './button.css';

const Button = ({ onClick, children }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default memo(Button);
