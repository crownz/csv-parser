import { connect } from 'react-redux';

import { swapWallets, exchangeCurrencies } from '../../actions/exchange';
import ExchangeWidget from './exchange-widget';

const mapStateToProps = state => {
  const {
    exchange: { baseCurrency, resultCurrency, rates, deduction },
    wallets
  } = state;

  return {
    deduction,
    exchangeRate: rates[resultCurrency],
    activeWallet: wallets[baseCurrency],
    resultWallet: wallets[resultCurrency]
  };
};

const mapDispatchToProps = {
  swapWallets,
  exchangeCurrencies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeWidget);
