const INDENTATION = '  ';
const DOUBLE_INDENTATION = INDENTATION + INDENTATION;

const getQueryString = (varName: string | number): string => {
  if (
    typeof varName === 'number' ||
    varName.startsWith('?') ||
    varName === '*' ||
    varName.includes(':') ||
    varName.startsWith("'") ||
    isExpression(varName)
  ) {
    return `${varName}`;
  }
  return '?' + varName;
};

const isExpression = (variable: string): boolean => {
  return /^\((.)*\sas\s?(.)*\)/.test(variable);
};

const indentString = (str: string, indent = INDENTATION) => str.replace(/^/gm, indent);

export default {
  getQueryString,
  indentString,
  isExpression,
  IDENTATION: INDENTATION,
  DOUBLE_INDENTATION,
};
