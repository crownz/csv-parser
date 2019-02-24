import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './exchange';

const mockStore = configureMockStore([thunk]);

describe('Exchange actions: ', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Should create an action to change exchange rates', () => {
    expect(actions.exchangeRateChanged({ GBP: 1.234 })).toEqual({
      type: actions.EXCHANGE_RATES_CHANGE,
      rates: { GBP: 1.234 }
    });
  });

  it('Should create an action to complete exchange', () => {
    expect(actions.exchangeComplete({ from: '', to: '' })).toEqual({
      type: actions.EXCHANGE_COMPLETE,
      contract: { from: '', to: '' }
    });
  });

  it('Should create an action to change active wallet', () => {
    expect(actions.activeWalletChanged('GBP', 'USD')).toEqual({
      type: actions.ACTIVE_WALLET_CHANGE,
      baseCurrency: 'GBP',
      resultCurrency: 'USD'
    });
  });

  it('Should create an action to update exchange balances', () => {
    expect(actions.exchangeBalancesChanged(1, 2)).toEqual({
      type: actions.EXCHANGE_BALANCES_CHANGE,
      deduction: 1,
      gain: 2
    });
  });

  it('Should create an action to swap wallets', () => {
    expect(actions.swapWalletsAction()).toEqual({
      type: actions.SWAP_WALLETS
    });
  });

  it('Should update exchange rates after fetching values', () => {
    fetchMock.getOnce(
      'http://data.fixer.io/api/latest?access_key=e56c462cf761a77c4639292b3fd8c351&symbols=USD,GBP,EUR',
      {
        body: { base: 'EUR', rates: { USD: 2, GBP: 2, EUR: 1 } },
        headers: { 'content-type': 'application/json' }
      }
    );

    const store = mockStore();

    const expectedActions = [
      {
        rates: {
          EUR: 1,
          GBP: 2,
          USD: 2
        },
        type: actions.EXCHANGE_RATES_CHANGE
      }
    ];

    return store.dispatch(actions.fetchExchangeRate('EUR')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Should calculate exchange balances when changing deduction', () => {
    const store = mockStore({
      exchange: {
        rates: {
          GBP: 2
        },
        resultCurrency: 'GBP'
      }
    });
    store.dispatch(actions.changeDeduction(100));

    const expectedActions = [
      {
        type: actions.EXCHANGE_BALANCES_CHANGE,
        deduction: 100,
        gain: 200
      }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should calculate exchange balances when changing gain', () => {
    const store = mockStore({
      exchange: {
        rates: {
          GBP: 2
        },
        resultCurrency: 'GBP'
      }
    });
    store.dispatch(actions.changeGain(100));

    const expectedActions = [
      {
        type: actions.EXCHANGE_BALANCES_CHANGE,
        deduction: 50,
        gain: 100
      }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should calculate exchange contract when exchange complete', () => {
    const store = mockStore({
      exchange: {
        rates: {
          GBP: 2
        },
        baseCurrency: 'EUR',
        resultCurrency: 'GBP',
        deduction: 1,
        gain: 2
      }
    });
    store.dispatch(actions.exchangeCurrencies());

    const expectedActions = [
      {
        type: actions.EXCHANGE_COMPLETE,
        contract: {
          from: 'EUR',
          to: 'GBP',
          deduction: 1,
          gain: 2
        }
      }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('Should swap wallets and update currencies', () => {
    fetchMock.getOnce(
      'http://data.fixer.io/api/latest?access_key=e56c462cf761a77c4639292b3fd8c351&symbols=USD,GBP,EUR',
      {
        body: { base: 'EUR', rates: { USD: 2, GBP: 2, EUR: 1 } },
        headers: { 'content-type': 'application/json' }
      }
    );

    const store = mockStore({
      exchange: {
        baseCurrency: 'EUR'
      }
    });

    const expectedActions = [
      {
        type: actions.SWAP_WALLETS
      },
      {
        rates: {
          EUR: 1,
          GBP: 2,
          USD: 2
        },
        type: actions.EXCHANGE_RATES_CHANGE
      }
    ];

    return store.dispatch(actions.swapWallets()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Should change base wallet and update currencies', () => {
    fetchMock.getOnce(
      'http://data.fixer.io/api/latest?access_key=e56c462cf761a77c4639292b3fd8c351&symbols=USD,GBP,EUR',
      {
        body: { base: 'EUR', rates: { USD: 2, GBP: 2, EUR: 1 } },
        headers: { 'content-type': 'application/json' }
      }
    );

    const store = mockStore({
      wallets: {
        EUR: {
          id: 'EUR'
        },
        GBP: {
          id: 'GBP'
        },
        USD: {
          id: 'USD'
        }
      },
      exchange: {
        resultCurrency: 'EUR',
        baseCurrency: 'GBP'
      }
    });

    const expectedActions = [
      {
        baseCurrency: 'GBP',
        resultCurrency: 'EUR',
        type: actions.ACTIVE_WALLET_CHANGE
      },
      {
        rates: {
          EUR: 0.5,
          GBP: 1,
          USD: 1
        },
        type: actions.EXCHANGE_RATES_CHANGE
      }
    ];

    return store.dispatch(actions.changeBaseWallet('GBP')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Should change result wallet  and update currencies', () => {
    fetchMock.getOnce(
      'http://data.fixer.io/api/latest?access_key=e56c462cf761a77c4639292b3fd8c351&symbols=USD,GBP,EUR',
      {
        body: { base: 'EUR', rates: { USD: 2, GBP: 2, EUR: 1 } },
        headers: { 'content-type': 'application/json' }
      }
    );

    const store = mockStore({
      wallets: {
        EUR: {
          id: 'EUR'
        },
        GBP: {
          id: 'GBP'
        },
        USD: {
          id: 'USD'
        }
      },
      exchange: {
        resultCurrency: 'EUR',
        baseCurrency: 'GBP'
      }
    });

    const expectedActions = [
      {
        baseCurrency: 'EUR',
        resultCurrency: 'GBP',
        type: actions.ACTIVE_WALLET_CHANGE
      },
      {
        rates: {
          EUR: 0.5,
          GBP: 1,
          USD: 1
        },
        type: actions.EXCHANGE_RATES_CHANGE
      }
    ];

    return store.dispatch(actions.changeResultWallet('GBP')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
