import React from 'react';

import styles from './balance-label.css';

const BalanceLabel = ({ formattedAmount, isInvalid = false }) => (
  <div
    className={`${styles.label} ${isInvalid ? styles.invalid : ''}`}
    data-test-id="balance-label"
  >
    {`Balance: ${formattedAmount}`}
  </div>
);

export default BalanceLabel;
