import React from 'react';

import { getFormattedAmount } from '../../libs/currency-utils';
import TrendingIcon from '../../icons/trending.svg';

import styles from './exchange-rate.css';

const ExchangeRate = ({ fromCurrency, toCurrency, rate }) => (
  <div className={styles.container} data-test-id="exchange-rate-container">
    <TrendingIcon />
    <div className={styles.label} data-test-id="exchange-rate-label">
      {`${getFormattedAmount(fromCurrency, 1, 0)} = ${getFormattedAmount(toCurrency, rate, 4)}`}
    </div>
  </div>
);

export default ExchangeRate;
