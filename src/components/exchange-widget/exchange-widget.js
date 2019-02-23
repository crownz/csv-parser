import React from 'react';

import Button from '../button';
import ExchangeRate from '../exchange-rate';
import SwapButton from '../swap-button';
import BaseWallet from '../wallet-entry/base-wallet';
import ResultWallet from '../wallet-entry/result-wallet';

import styles from './exchange-widget.css';

const ExchangeWidget = ({
  exchangeRate,
  activeWallet,
  resultWallet,
  deduction,
  swapWallets,
  exchangeCurrencies
}) => (
  <div className={styles.container} data-test-id="exchange-widget">
    <div className={styles.top}>
      <BaseWallet />
      <div className={styles.swap}>
        <SwapButton onClick={swapWallets} />
      </div>
      <div className={styles.rate}>
        {exchangeRate && (
          <ExchangeRate
            fromCurrency={activeWallet.sign}
            toCurrency={resultWallet.sign}
            rate={exchangeRate}
          />
        )}
      </div>
    </div>
    <div className={styles.bottom}>
      <ResultWallet />
      <Button
        onClick={exchangeCurrencies}
        disabled={!deduction || deduction < 0.1 || deduction > activeWallet.amount}
      >
        Exchange
      </Button>
    </div>
  </div>
);

export default ExchangeWidget;
