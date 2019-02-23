import { get } from '../libs/fetch';
import { mapExchangeRates } from '../libs/currency-utils';

// SHOULD BE MOVED TO ENV VARS/CONFIG.
const API_KEY = '061066cb384cfa384603354e55e092e9';

export const EXCHANGE_RATES_CHANGE = 'EXCHANGE_RATES_CHANGE';
export const EXCHANGE_BALANCES_CHANGE = 'EXCHANGE_BALANCES_CHANGE';
export const EXCHANGE_COMPLETE = 'EXCHANGE_COMPLETE';
export const SWAP_WALLETS = 'SWAP_WALLETS';
export const ACTIVE_WALLET_CHANGE = 'ACTIVE_WALLET_CHANGE';

export const exchangeRateChanged = rates => ({ type: EXCHANGE_RATES_CHANGE, rates });
export const exchangeComplete = contract => ({ type: EXCHANGE_COMPLETE, contract });
export const activeWalletChanged = (baseCurrency, resultCurrency) => ({
  type: ACTIVE_WALLET_CHANGE,
  baseCurrency,
  resultCurrency
});

export const exchangeBalancesChanged = (deduction, gain) => ({
  type: EXCHANGE_BALANCES_CHANGE,
  deduction,
  gain
});

export const swapWalletsAction = () => ({
  type: SWAP_WALLETS
});

export const fetchExchangeRate = currency => dispatch =>
  get(`http://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=USD,GBP,EUR`).then(result => {
    const rates =
      currency === result.base ? result.rates : mapExchangeRates(result.rates, currency);
    dispatch(exchangeRateChanged(rates));
  });

export const changeDeduction = deduction => (dispatch, getState) => {
  const { rates, resultCurrency } = getState().exchange;
  const rate = rates[resultCurrency];
  const gain = deduction * rate;
  dispatch(exchangeBalancesChanged(deduction, gain));
};

export const changeGain = gain => (dispatch, getState) => {
  const { rates, resultCurrency } = getState().exchange;
  const rate = rates[resultCurrency];
  const deduction = gain / rate;
  dispatch(exchangeBalancesChanged(deduction, gain));
};

export const swapWallets = () => (dispatch, getState) => {
  dispatch(swapWalletsAction());
  dispatch(fetchExchangeRate(getState().exchange.baseCurrency));
};

export const exchangeCurrencies = () => (dispatch, getState) => {
  const { baseCurrency, resultCurrency, deduction, gain } = getState().exchange;
  const contract = {
    from: baseCurrency,
    to: resultCurrency,
    deduction,
    gain
  };

  dispatch(exchangeComplete(contract));
};

export const changeBaseWallet = baseId => (dispatch, getState) => {
  const {
    wallets,
    exchange: { resultCurrency }
  } = getState();

  const resultId =
    resultCurrency !== baseId
      ? resultCurrency
      : Object.keys(wallets).find(key => wallets[key].id !== baseId);

  dispatch(activeWalletChanged(baseId, resultId));
  dispatch(fetchExchangeRate(getState().exchange.baseCurrency));
};

export const changeResultWallet = resultId => (dispatch, getState) => {
  const {
    wallets,
    exchange: { baseCurrency }
  } = getState();

  const baseId =
    baseCurrency !== resultId
      ? baseCurrency
      : Object.keys(wallets).find(key => wallets[key].id !== resultId);

  dispatch(activeWalletChanged(baseId, resultId));
  dispatch(fetchExchangeRate(getState().exchange.baseCurrency));
};
