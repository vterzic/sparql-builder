"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INDENTATION = '  ';
const DOUBLE_INDENTATION = INDENTATION + INDENTATION;
const getQueryString = (varName) => {
    if (typeof varName === 'number' ||
        varName.startsWith('?') ||
        varName === '*' ||
        varName.includes(':') ||
        varName.startsWith("'") ||
        isExpression(varName)) {
        return `${varName}`;
    }
    return '?' + varName;
};
const isExpression = (variable) => {
    return /^\((.)*\sas\s?(.)*\)/.test(variable);
};
const indentString = (str, indent = INDENTATION) => str.replace(/^/gm, indent);
exports.default = {
    getQueryString,
    indentString,
    isExpression,
    IDENTATION: INDENTATION,
    DOUBLE_INDENTATION,
};
