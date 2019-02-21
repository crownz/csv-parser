import { connect } from 'react-redux';

import Wallet from './wallet-entry';

import { changeGain, changeResultWallet } from '../../actions/exchange';

const mapStateToProps = state => {
  const {
    exchange: { resultCurrency, gain },
    wallets
  } = state;

  return {
    exchangeAmount: gain,
    wallet: wallets[resultCurrency],
    shouldValidateWallet: false
  };
};

const mapDispatchToProps = {
  onAmountChange: changeGain,
  onWalletSelect: changeResultWallet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);
