import React, { memo } from 'react';

import WalletSelector from '../wallet-selector';
import Input from '../input';
import BalanceLabel from '../balance-label';

import styles from './wallet-entry.css';

const WalletEntry = ({ wallet, onWalletChahnge, exchangeAmount, onAmountChange }) => (
  <div className={styles.container}>
    <div className={styles.walletInfo}>
      <WalletSelector value={wallet.currencyName} />
      <BalanceLabel formattedAmount={wallet.formattedAmount} />
    </div>
    <div className={styles.input}>
      <Input placeholder="0" value={exchangeAmount} onChange={onAmountChange} />
    </div>
  </div>
);

export default WalletEntry;
