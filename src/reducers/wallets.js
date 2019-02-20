import { EXCHANGE_COMPLETE } from '../actions/exchange';

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
    case EXCHANGE_COMPLETE:
      const { from, to, deduction, gain } = action.contract;
      const fromWallet = { ...state[from], amount: state[from].amount - deduction };
      const toWallet = { ...state[to], amount: state[to].amount + gain };
      return { ...state, [from]: fromWallet, [to]: toWallet };
    default:
      return state;
  }
};

export default wallets;
