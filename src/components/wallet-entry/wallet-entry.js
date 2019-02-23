import React from 'react';
import PropTypes from 'prop-types';

import { getFormattedAmount } from '../../libs/currency-utils';
import WalletSelector from '../wallet-selector';
import Input from '../input';
import BalanceLabel from '../balance-label';

import styles from './wallet-entry.css';

const WalletEntry = ({
  wallet,
  exchangeAmount,
  onAmountChange,
  shouldValidateWallet = false,
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

WalletEntry.propTypes = {
  wallet: PropTypes.shape({
    sign: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  }),
  onAmountChange: PropTypes.func.isRequired,
  onWalletSelect: PropTypes.func.isRequired,
  shouldValidateWallet: PropTypes.bool,
  exchangeAmount: PropTypes.number
};

export default WalletEntry;
