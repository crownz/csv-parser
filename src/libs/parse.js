const NEW_LINE_REGEX = /\r?\n/g;
const ENTRY_SEPERATOR = ',';
const ESCAPED_QUOTES = /""/g;

const parse = csv => {
  if (!csv) {
    return [];
  }

  const withEscapedQuotes = csv.replace(ESCAPED_QUOTES, "'");

  const withoutLastNewLine = withEscapedQuotes.slice(-1).match(NEW_LINE_REGEX)
    ? withEscapedQuotes.slice(0, -1)
    : withEscapedQuotes;

  const parsed = withoutLastNewLine
    .split(NEW_LINE_REGEX)
    .map(rowString => rowString.split(ENTRY_SEPERATOR));

  return parsed;
};

export const getRows = csv => csv.split(NEW_LINE_REGEX);

export default parse;
