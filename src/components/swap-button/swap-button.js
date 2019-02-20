import React, { memo } from 'react';

import SwapIcon from '../../icons/swap.svg';

import styles from './swap-button.css';

const SwapButton = ({ onClick }) => (
  <div role="button" onClick={onClick} className={styles.button}>
    <SwapIcon />
  </div>
);

export default SwapButton;
