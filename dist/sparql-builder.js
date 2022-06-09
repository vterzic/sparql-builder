"use strict";
const optional_1 = require("./core/optional");
const select_query_1 = require("./core/select-query");
class SparqlBuilder {
    static selectQuery() {
        return new select_query_1.default();
    }
    static optional() {
        return new optional_1.default();
    }
}
module.exports = SparqlBuilder;
