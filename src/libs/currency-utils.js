export const getFormattedAmount = (currencySign, amount, fixedNumber = 2) =>
  `${currencySign}${amount.toFixed(fixedNumber)}`;

export const roundToTwoDecimals = number => +number.toFixed(2);

export const mapExchangeRates = (rates, resultCurrency) =>
  Object.keys(rates).reduce((resultRates, currency) => {
    const rateToBase = rates[currency];
    const ratesToResultCurrency = (1 / rates[resultCurrency]) * rateToBase;
    // eslint-disable-next-line no-param-reassign
    resultRates[currency] = ratesToResultCurrency;
    return resultRates;
  }, {});
