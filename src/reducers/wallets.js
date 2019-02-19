import { EXCHANGE_RATES_CHANGE } from '../actions/exchange';

const initialState = {
  USD: {
    sign: '$',
    id: 'USD',
    amount: 100.53
  },
  GBP: {
    sign: '£',
    id: 'GBP',
    amount: 15.3
  },
  EUR: {
    sign: '€',
    id: 'EUR',
    amount: 300
  }
};

const wallets = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default wallets;
