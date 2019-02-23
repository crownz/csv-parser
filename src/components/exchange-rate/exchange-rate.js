import React from 'react';
import PropTypes from 'prop-types';

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

ExchangeRate.propTypes = {
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired
};

export default ExchangeRate;
