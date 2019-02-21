import {
  EXCHANGE_RATES_CHANGE,
  EXCHANGE_BALANCES_CHANGE,
  SWAP_WALLETS,
  ACTIVE_WALLET_CHANGE,
  EXCHANGE_COMPLETE
} from '../actions/exchange';

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
    case ACTIVE_WALLET_CHANGE:
      return {
        ...state,
        deduction: null,
        gain: null,
        baseCurrency: action.baseCurrency,
        resultCurrency: action.resultCurrency,
        rates: {}
      };
    case EXCHANGE_COMPLETE:
      return {
        ...state,
        deduction: null,
        gain: null
      };
    default:
      return state;
  }
};

export default exchange;
