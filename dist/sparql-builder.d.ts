import Optional from './core/optional';
import SelectQuery from './core/select-query';
declare class SparqlBuilder {
    static selectQuery(): SelectQuery;
    static optional(): Optional;
}
export = SparqlBuilder;
