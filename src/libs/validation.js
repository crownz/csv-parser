const lessThanOneRegex = /^([0]$)|([0][.]\d{0,2}$)/;
const moreThanOneRegex = /^[1-9]\d*[.]?\d{0,2}$/;

export const validateNumberInput = stringValue =>
  !stringValue || moreThanOneRegex.test(stringValue) || lessThanOneRegex.test(stringValue);
