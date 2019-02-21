import { connect } from 'react-redux';

import {
  changeDeduction,
  changeGain,
  swapWallets,
  exchangeCurrencies,
  changeResultWallet,
  changeBaseWallet
} from '../../actions/exchange';
import ExchangeWidget from './exchange-widget';

const mapStateToProps = state => {
  const {
    exchange: { baseCurrency, resultCurrency, rates, deduction, gain },
    wallets
  } = state;

  console.log('mapping', state);

  return {
    deduction,
    gain,
    exchangeRate: rates[resultCurrency],
    activeWallet: wallets[baseCurrency],
    resultWallet: wallets[resultCurrency]
  };
};

const mapDispatchToProps = {
  onDeductionChange: changeDeduction,
  onGainChange: changeGain,
  swapWallets,
  exchangeCurrencies,
  changeBaseWallet,
  changeResultWallet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeWidget);
