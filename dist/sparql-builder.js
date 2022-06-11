"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.operators = exports.builder = void 0;
const optional_1 = __importDefault(require("./core/optional"));
const select_query_1 = __importDefault(require("./core/select-query"));
const operators_1 = __importDefault(require("./core/operators"));
exports.operators = operators_1.default;
const builder = {
    selectQuery: () => {
        return new select_query_1.default();
    },
    optional: () => {
        return new optional_1.default();
    },
};
exports.builder = builder;
