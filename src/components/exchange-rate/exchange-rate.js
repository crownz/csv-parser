import React, { memo } from 'react';

import { getFormattedAmount } from '../../libs/currency-utils';

import styles from './exchange-rate.css';

const ExchangeRate = ({ fromCurrency, toCurrency, rate }) => (
  <div className={styles.container}>
    {`${fromCurrency}1 = ${getFormattedAmount(toCurrency, rate, 4)}`}
  </div>
);

export default memo(ExchangeRate);
