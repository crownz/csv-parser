import React from 'react';

import Button from '../button';
import ExchangeRate from '../exchange-rate';
import WalletEntry from '../wallet-entry';
import SwapButton from '../swap-button';

import styles from './exchange-widget.css';

const ExchangeWidget = ({
  exchangeRate,
  baseCurrency,
  resultCurrency,
  activeWallet,
  resultWallet,
  deduction,
  gain,
  onDeductionChange,
  onGainChange,
  swapWallets,
  exchangeCurrencies
}) => (
  <div className={styles.container}>
    <div className={styles.top}>
      <WalletEntry
        wallet={activeWallet}
        exchangeAmount={deduction}
        onAmountChange={onDeductionChange}
        shouldValidateWallet
      />
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
      <WalletEntry wallet={resultWallet} exchangeAmount={gain} onAmountChange={onGainChange} />
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
