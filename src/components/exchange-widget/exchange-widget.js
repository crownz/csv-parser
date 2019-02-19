import React from 'react';

import Button from '../button';
import Input from '../input';
import BalanceLabel from '../balance-label';
import ExchangeRate from '../exchange-rate';
import WalletEntry from '../wallet-entry';

import styles from './exchange-widget.css';

const gbpWallet = {
  currencyName: 'GBP',
  currencySign: '£',
  amount: 101.3,
  formattedAmount: '£101.30'
};

const usdWallet = {
  currencyName: 'USD',
  currencySign: '$',
  amount: 53.22,
  formattedAmount: '$53.22'
};

const ExchangeWidget = () => (
  <div className={styles.container}>
    <div className={styles.top}>
      <WalletEntry wallet={gbpWallet} />
      <div className={styles.rate}>
        <ExchangeRate fromCurrency="$" toCurrency="EUR" rate="1.1503" />
      </div>
    </div>
    <div className={styles.bottom}>
      <WalletEntry wallet={usdWallet} isGray />
      <Button onClick={() => {}}>Exchange</Button>
    </div>
  </div>
);

export default ExchangeWidget;
