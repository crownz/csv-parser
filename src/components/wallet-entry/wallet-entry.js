import React from 'react';

import { getFormattedAmount } from '../../libs/currency-utils';
import WalletSelector from '../wallet-selector';
import Input from '../input';
import BalanceLabel from '../balance-label';

import styles from './wallet-entry.css';

const WalletEntry = ({
  wallet,
  exchangeAmount,
  onAmountChange,
  shouldValidateWallet,
  onWalletSelect
}) => (
  <div className={styles.container} data-test-id="wallet-entry">
    <div className={styles.walletInfo}>
      <WalletSelector value={wallet.id} onChange={onWalletSelect} />
      <BalanceLabel
        formattedAmount={getFormattedAmount(wallet.sign, wallet.amount)}
        isInvalid={shouldValidateWallet && wallet.amount < exchangeAmount}
      />
    </div>
    <div className={styles.input}>
      <Input placeholder="0" value={exchangeAmount} onChange={onAmountChange} />
    </div>
  </div>
);

export default WalletEntry;
