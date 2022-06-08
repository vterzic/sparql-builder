const INDENTATION = '  ';
const DOUBLE_INDENTATION = INDENTATION + INDENTATION;

const getQueryString = (varName: string | number): string => {
  if (
    typeof varName === 'number' ||
    varName.startsWith('?') ||
    varName === '*' ||
    varName.includes(':') ||
    varName.startsWith("'")
  ) {
    return `${varName}`;
  }
  return '?' + varName;
};

const indentString = (str: string, indent = INDENTATION) => str.replace(/^/gm, indent);

export default { getQueryString, indentString, IDENTATION: INDENTATION, DOUBLE_INDENTATION };
