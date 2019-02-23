import React from 'react';

import styles from './button.css';

const Button = ({ onClick, children, disabled = false }) => (
  <button
    className={`${styles.button} ${disabled ? styles.disabled : ''}`}
    type="button"
    onClick={() => !disabled && onClick()}
    data-test-id="button"
  >
    {children}
  </button>
);

export default Button;
