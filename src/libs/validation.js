const lessThanOneRegex = /^([0]$)|([0][.]\d{0,2}$)/;
const numberRegex = /^[1-9]\d*[.]?\d{0,2}$/;

export const validateNumberInput = stringValue =>
  !stringValue || numberRegex.test(stringValue) || lessThanOneRegex.test(stringValue);
