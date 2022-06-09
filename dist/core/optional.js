"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class Optional {
    constructor() {
        this.graphPattern = [];
    }
    where(subject, predicate, object) {
        this.graphPattern.push([subject, predicate, object]);
        return this;
    }
    render() {
        return this.getGraphPattern();
    }
    getGraphPattern() {
        if (!this.graphPattern.length)
            return '';
        let graphPattern = 'OPTIONAL {';
        for (const statement of this.graphPattern) {
            const [subj, pred, obj] = statement;
            graphPattern +=
                '\n' +
                    util_1.default.IDENTATION +
                    util_1.default.getQueryString(subj) +
                    ' ' +
                    util_1.default.getQueryString(pred) +
                    ' ' +
                    util_1.default.getQueryString(obj) +
                    ' .';
        }
        return graphPattern + '\n}';
    }
}
exports.default = Optional;
