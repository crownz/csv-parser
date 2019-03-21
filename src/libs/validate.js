import parse, { getRows } from './parse';

export const isParsable = csv => {
  try {
    parse(csv);
  } catch (e) {
    return false;
  }
  return true;
};

export const rowEndsWithoutComma = csv => {
  const rows = getRows(csv);
  const endWithComma = rows.find(row => row.slice(-1) === ',');
  return !endWithComma;
};

export const hasSameAmountOfEntries = csv => {
  const data = parse(csv);
  const firstRowLength = data[0].length;
  const hasDifferentLength = data.find(row => row.length !== firstRowLength);
  return !hasDifferentLength;
};

export const hasCorrectCountOfQuotes = csv => (csv.match(/"/g) || []).length % 2 === 0;

const validators = [
  isParsable,
  rowEndsWithoutComma,
  hasSameAmountOfEntries,
  hasCorrectCountOfQuotes
];

const validate = csv => {
  if (!csv) {
    return true;
  }

  const isInvalid = validators.find(func => !func(csv));

  return !isInvalid;
};

export default validate;
