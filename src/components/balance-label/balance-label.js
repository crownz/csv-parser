import React from 'react';
import PropTypes from 'prop-types';

import styles from './balance-label.css';

const BalanceLabel = ({ formattedAmount, isInvalid = false }) => (
  <div
    className={`${styles.label} ${isInvalid ? styles.invalid : ''}`}
    data-test-id="balance-label"
  >
    {`Balance: ${formattedAmount}`}
  </div>
);

BalanceLabel.propTypes = {
  formattedAmount: PropTypes.string.isRequired,
  isInvalid: PropTypes.bool
};

BalanceLabel.defaultProps = {
  isInvalid: false
};

export default BalanceLabel;
