import React from 'react';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

export default Button;
