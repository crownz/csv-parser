import { EXCHANGE_COMPLETE } from '../actions/exchange';
import wallets from './wallets';

const state = {
  USD: {
    sign: '$',
    id: 'USD',
    amount: 100.53
  },
  EUR: {
    sign: '€',
    id: 'EUR',
    amount: 300
  }
};

describe('Wallets reducer: ', () => {
  it('should return state', () => {
    expect(wallets(state, {})).toEqual(state);
  });

  it('should update state after exchange complete', () => {
    const contract = {
      from: 'EUR',
      to: 'USD',
      deduction: 100,
      gain: 100
    };
    expect(wallets(state, { type: EXCHANGE_COMPLETE, contract })).toEqual({
      USD: {
        sign: '$',
        id: 'USD',
        amount: 200.53
      },
      EUR: {
        sign: '€',
        id: 'EUR',
        amount: 200
      }
    });
  });
});
