import { get } from '../libs/fetch';

const API_KEY = '21d24415248f4618922ede3e56278218';

export const EXCHANGE_RATES_CHANGE = 'EXCHANGE_RATES_CHANGE';
export const EXCHANGE_BALANCES_CHANGE = 'EXCHANGE_BALANCES_CHANGE';
export const EXCHANGE_COMPLETE = 'EXCHANGE_COMPLETE';
export const SWAP_WALLETS = 'SWAP_WALLETS';

export const exchangeRateChanged = rates => ({ type: EXCHANGE_RATES_CHANGE, rates });

export const exchangeBalancesChanged = (deduction, gain) => ({
  type: EXCHANGE_BALANCES_CHANGE,
  deduction,
  gain
});

export const swapWalletsAction = () => ({
  type: SWAP_WALLETS
});

export const fetchExchangeRate = currency => (dispatch, getState) =>
  get(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}&base=${currency}`).then(
    result => {
      console.log('result:', result);
      dispatch(exchangeRateChanged(result.rates));
    }
  );

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

export const exchangeCurrencies = () => {};
