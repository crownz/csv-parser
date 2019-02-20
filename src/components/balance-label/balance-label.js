import React, { memo } from 'react';

import styles from './balance-label.css';

const BalanceLabel = ({ formattedAmount, isInvalid }) => (
  <div className={`${styles.label} ${isInvalid ? styles.invalid : ''}`}>
    {`Balance: ${formattedAmount}`}
  </div>
);

export default memo(BalanceLabel);
