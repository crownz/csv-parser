import React, { memo } from 'react';

import styles from './exchange-rate.css';

const ExchangeRate = ({ fromCurrency, toCurrency, rate }) => (
  <div className={styles.container}>{`${fromCurrency}1 = ${toCurrency}${rate}`}</div>
);

export default memo(ExchangeRate);
