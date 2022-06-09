declare const _default: {
    asc: (varName: string) => string;
    desc: (varName: string) => string;
    iri: (value: string) => string;
    ifFunc: (ifExpression: string, thenExpression: string, elseExpression: string) => string;
    prefix: (prefix: string, iriVal: string) => string;
    toStringLiteral: (value: string) => string;
    sum: (expression: string, variableName: string) => string;
};
export default _default;
