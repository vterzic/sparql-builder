import util from './util';

const asc = (varName: string): string => {
  const resultVariable = util.getQueryString(varName);
  return `ASC(${resultVariable})`;
};

const desc = (varName: string): string => {
  const resultVariable = util.getQueryString(varName);
  return `DESC(${resultVariable})`;
};

const iri = (value: string): string => {
  if (value.startsWith('<') && value.endsWith('>')) {
    return value;
  }

  return '<' + value + '>';
};

const ifFunc = (ifExpression: string, thenExpression: string, elseExpression: string): string => {
  return `IF(${ifExpression}, ${thenExpression}, ${elseExpression})`;
};

const prefix = (prefix: string, iriVal: string): string => {
  return `PREFIX ${prefix}: ${iri(iriVal)}`;
};

const toStringLiteral = (value: string) => {
  return `'${value}'`;
};

export default { asc, desc, iri, ifFunc, prefix, toStringLiteral };
