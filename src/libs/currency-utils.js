export const getFormattedAmount = (currencySign, amount, fixedNumber = 2) =>
  `${currencySign}${amount.toFixed(fixedNumber)}`;
