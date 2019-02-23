import React, { memo } from 'react';
import PropTypes from 'prop-types';

import SwapIcon from '../../icons/swap.svg';

import styles from './swap-button.css';

const SwapButton = ({ onClick }) => (
  <div role="button" onClick={onClick} className={styles.button} data-test-id="swap-button">
    <SwapIcon />
  </div>
);

SwapButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SwapButton;
