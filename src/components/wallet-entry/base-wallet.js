import { connect } from 'react-redux';

import Wallet from './wallet-entry';

import { changeDeduction, changeBaseWallet } from '../../actions/exchange';

const mapStateToProps = state => {
  const {
    exchange: { baseCurrency, deduction },
    wallets
  } = state;

  return {
    exchangeAmount: deduction,
    wallet: wallets[baseCurrency],
    shouldValidateWallet: true
  };
};

const mapDispatchToProps = {
  onAmountChange: changeDeduction,
  onWalletSelect: changeBaseWallet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
