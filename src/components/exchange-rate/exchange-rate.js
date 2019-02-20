import React, { memo } from 'react';

import { getFormattedAmount } from '../../libs/currency-utils';
import TrendingIcon from '../../icons/trending.svg';

import styles from './exchange-rate.css';

const ExchangeRate = ({ fromCurrency, toCurrency, rate }) => (
  <div className={styles.container}>
    <TrendingIcon />
    <div className={styles.label}>
      {`${fromCurrency}1 = ${getFormattedAmount(toCurrency, rate, 4)}`}
    </div>
  </div>
);

export default memo(ExchangeRate);
