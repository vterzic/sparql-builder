"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class SelectQuery {
    constructor() {
        this.SELECT_KEYWORD = 'SELECT';
        this.prefixes = [];
        this.selectVariables = [];
        this.graphPattern = [];
        this.orderByValues = [];
        this.bindVariables = [];
        this.optionals = [];
        this.subQueries = [];
        this.groupByCriteria = [];
        return this;
    }
    prefix(prefix) {
        this.prefixes.push(prefix);
        return this;
    }
    select(...variables) {
        this.selectVariables = variables;
        return this;
    }
    where(subject, predicate, object) {
        this.graphPattern.push([subject, predicate, object]);
        return this;
    }
    limit(limit) {
        this.limitValue = limit;
        return this;
    }
    offset(offset) {
        this.offsetValue = offset;
        return this;
    }
    orderBy(orderBy) {
        this.orderByValues.push(orderBy);
        return this;
    }
    bind(expression, bindVariable) {
        this.bindVariables.push(`BIND (${expression} as ${util_1.default.getQueryString(bindVariable)})`);
        return this;
    }
    optional(optional) {
        this.optionals.push(optional);
        return this;
    }
    nest(subQuery) {
        this.subQueries.push(subQuery);
        return this;
    }
    groupBy(...groupByCriteria) {
        this.groupByCriteria = groupByCriteria;
        return this;
    }
    render() {
        return (this.getPrefixes() +
            this.SELECT_KEYWORD +
            this.getSelectVariables() +
            this.getGraphPattern() +
            this.getGroupByCriteria() +
            this.getOrderBy() +
            this.getOffset() +
            this.getLimit());
    }
    getPrefixes() {
        let prefixes = '';
        let newLine = '';
        if (!this.prefixes.length) {
            return '';
        }
        for (const [i, p] of this.prefixes.entries()) {
            if (i !== 0) {
                newLine = '\n';
            }
            prefixes += newLine + p;
        }
        return prefixes + '\n';
    }
    getSelectVariables() {
        let vars = '';
        for (const varName of this.selectVariables) {
            vars += ' ' + util_1.default.getQueryString(varName);
        }
        return vars;
    }
    getGraphPattern() {
        let whereClause = ' WHERE {';
        whereClause += this.getBindVariables();
        for (const statement of this.graphPattern) {
            const [subj, pred, obj] = statement;
            whereClause +=
                '\n' +
                    util_1.default.IDENTATION +
                    util_1.default.getQueryString(subj) +
                    ' ' +
                    util_1.default.getQueryString(pred) +
                    ' ' +
                    util_1.default.getQueryString(obj) +
                    ' .';
        }
        whereClause += this.getNestedQueries();
        return whereClause + this.getOptionals() + '\n}';
    }
    getOptionals() {
        if (!this.optionals.length) {
            return '';
        }
        let optionals = '';
        for (const o of this.optionals) {
            optionals += '\n' + o.render();
        }
        // hack to avoid identation on the end of previous row
        return '\n' + util_1.default.indentString(optionals.substr(1));
    }
    getLimit() {
        if (this.limitValue) {
            return ' LIMIT ' + this.limitValue;
        }
        return '';
    }
    getGroupByCriteria() {
        if (!this.groupByCriteria.length) {
            return '';
        }
        let groupBy = ' GROUP BY';
        for (const c of this.groupByCriteria) {
            groupBy += ' ' + util_1.default.getQueryString(c);
        }
        return groupBy;
    }
    getOrderBy() {
        if (!this.orderByValues.length) {
            return '';
        }
        let orderByClause = ' ORDER BY';
        for (const orderBy of this.orderByValues) {
            orderByClause += ' ' + orderBy;
        }
        return orderByClause;
    }
    getOffset() {
        if (this.offsetValue) {
            return ' OFFSET ' + this.offsetValue;
        }
        return '';
    }
    getBindVariables() {
        if (!this.bindVariables.length) {
            return '';
        }
        let bindSection = '';
        for (const bind of this.bindVariables) {
            bindSection += '\n' + util_1.default.IDENTATION + bind + ' .';
        }
        return bindSection;
    }
    getNestedQueries() {
        if (!this.subQueries.length) {
            return '';
        }
        let nested = '';
        for (const subQuery of this.subQueries) {
            nested += '\n' + util_1.default.IDENTATION + '{\n';
            nested += util_1.default.indentString(subQuery.render(), util_1.default.DOUBLE_INDENTATION);
            nested += '\n' + util_1.default.IDENTATION + '}';
        }
        return nested;
    }
}
exports.default = SelectQuery;
