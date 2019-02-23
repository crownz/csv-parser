import {
  EXCHANGE_RATES_CHANGE,
  EXCHANGE_BALANCES_CHANGE,
  SWAP_WALLETS,
  ACTIVE_WALLET_CHANGE,
  EXCHANGE_COMPLETE
} from '../actions/exchange';
import exchange from './exchange';

const state = {
  rates: {
    GBP: 2,
    EUR: 3
  },
  baseCurrency: 'USD',
  resultCurrency: 'GBP',
  deduction: null,
  gain: null
};

describe('Wallets reducer: ', () => {
  it('should return state', () => {
    expect(exchange(state, {})).toEqual(state);
  });

  it('should update state after rates change', () => {
    const resultState = {
      baseCurrency: 'USD',
      resultCurrency: 'GBP',
      deduction: null,
      gain: null,
      rates: { EUR: 4 }
    };

    expect(exchange(state, { type: EXCHANGE_RATES_CHANGE, rates: { EUR: 4 } })).toEqual(
      resultState
    );
  });

  it('should update state after balances change', () => {
    const resultState = {
      rates: {
        GBP: 2,
        EUR: 3
      },
      baseCurrency: 'USD',
      resultCurrency: 'GBP',
      deduction: 1,
      gain: 2
    };

    expect(exchange(state, { type: EXCHANGE_BALANCES_CHANGE, deduction: 1, gain: 2 })).toEqual(
      resultState
    );
  });

  it('should update state after wallets swap', () => {
    const resultState = {
      rates: {},
      baseCurrency: 'GBP',
      resultCurrency: 'USD',
      deduction: null,
      gain: null
    };

    expect(exchange(state, { type: SWAP_WALLETS })).toEqual(resultState);
  });

  it('should update state after changing active wallet', () => {
    const resultState = {
      rates: {},
      baseCurrency: 'EUR',
      resultCurrency: 'USD',
      deduction: null,
      gain: null
    };

    expect(
      exchange(state, { type: ACTIVE_WALLET_CHANGE, baseCurrency: 'EUR', resultCurrency: 'USD' })
    ).toEqual(resultState);
  });

  it('should reset ballances after exchange complete', () => {
    const resultState = {
      rates: {
        GBP: 2,
        EUR: 3
      },
      baseCurrency: 'USD',
      resultCurrency: 'GBP',
      deduction: null,
      gain: null
    };

    expect(exchange(state, { type: EXCHANGE_COMPLETE })).toEqual(resultState);
  });
});
