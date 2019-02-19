import { connect } from 'react-redux';

import { changeDeduction, changeGain, swapWallets } from '../../actions/exchange';
import ExchangeWidget from './exchange-widget';

const mapStateToProps = state => {
  const {
    exchange: { baseCurrency, resultCurrency, rates, deduction, gain },
    wallets
  } = state;

  return {
    baseCurrency,
    resultCurrency,
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
  swapWallets
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeWidget);
