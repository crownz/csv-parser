import React, { memo } from 'react';

import { getFormattedAmount } from '../../libs/currency-utils';
import WalletSelector from '../wallet-selector';
import Input from '../input';
import BalanceLabel from '../balance-label';

import styles from './wallet-entry.css';

const WalletEntry = ({
  wallet,
  onWalletChahnge,
  exchangeAmount,
  onAmountChange,
  shouldValidateWallet
}) => (
  <div className={styles.container}>
    <div className={styles.walletInfo}>
      <WalletSelector value={wallet.id} />
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
