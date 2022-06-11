"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("./util"));
const asc = (varName) => {
    const resultVariable = util_1.default.getQueryString(varName);
    return `ASC(${resultVariable})`;
};
const desc = (varName) => {
    const resultVariable = util_1.default.getQueryString(varName);
    return `DESC(${resultVariable})`;
};
const iri = (value) => {
    if (value.startsWith('<') && value.endsWith('>')) {
        return value;
    }
    return '<' + value + '>';
};
const ifFunc = (ifExpression, thenExpression, elseExpression) => {
    return `IF(${ifExpression}, ${thenExpression}, ${elseExpression})`;
};
const prefix = (prefix, iriVal) => {
    return `PREFIX ${prefix}: ${iri(iriVal)}`;
};
const toStringLiteral = (value) => {
    return `'${value}'`;
};
const sum = (expression, variableName) => {
    const variable = variableName.startsWith('?') ? variableName : `?${variableName}`;
    return `(SUM(${expression}) as ${variable})`;
};
exports.default = { asc, desc, iri, ifFunc, prefix, toStringLiteral, sum };
