import { EXCHANGE_RATES_CHANGE, EXCHANGE_BALANCES_CHANGE, SWAP_WALLETS } from '../actions/exchange';

const initialState = {
  rates: {},
  baseCurrency: 'USD',
  resultCurrency: 'GBP',
  deduction: null,
  gain: null,
  availableAmount: 0
};

const exchange = (state = initialState, action) => {
  switch (action.type) {
    case EXCHANGE_RATES_CHANGE:
      return { ...state, rates: action.rates };
    case EXCHANGE_BALANCES_CHANGE:
      return { ...state, deduction: action.deduction, gain: action.gain };
    case SWAP_WALLETS:
      return {
        ...state,
        resultCurrency: state.baseCurrency,
        baseCurrency: state.resultCurrency,
        deduction: state.gain,
        gain: state.deduction,
        rates: {}
      };
    default:
      return state;
  }
};

export default exchange;
