import React, { memo } from 'react';

import styles from './swap-button.css';

const SwapButton = ({ onClick }) => (
  <div role="button" onClick={onClick} className={styles.button} />
);

export default SwapButton;
