import React, { memo } from 'react';

import styles from './balance-label.css';

const BalanceLabel = ({ formattedAmount }) => (
  <div className={styles.label}>{`Balance: ${formattedAmount}`}</div>
);

export default memo(BalanceLabel);
