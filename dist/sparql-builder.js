"use strict";
const optional_1 = require("./core/optional");
const select_query_1 = require("./core/select-query");
const selectQuery = () => {
    return new select_query_1.default();
};
// TODO construct update
const optional = () => {
    return new optional_1.default();
};
module.exports = { selectQuery, optional };
