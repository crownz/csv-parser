import React, { memo } from 'react';

import styles from './button.css';

const Button = ({ onClick, children, disabled }) => (
  <button
    className={`${styles.button} ${disabled ? styles.disabled : ''}`}
    type="button"
    onClick={() => !disabled && onClick()}
  >
    {children}
  </button>
);

export default memo(Button);
