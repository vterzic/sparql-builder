import Optional from './optional';
declare type nestedType = 'REGULAR' | 'OPTIONAL' | 'UNION';
export default class SelectQuery {
    private readonly SELECT_KEYWORD;
    private prefixes;
    private selectVariables;
    private graphPattern;
    private orderByValues;
    private offsetValue;
    private limitValue;
    private bindVariables;
    private optionals;
    private subQueries;
    private groupByCriteria;
    private havingClause;
    prefix(prefix: string): SelectQuery;
    select(...variables: string[]): SelectQuery;
    where(subject: string, predicate: string, object: string): SelectQuery;
    limit(limit: number): SelectQuery;
    offset(offset: number): SelectQuery;
    orderBy(orderBy: string): SelectQuery;
    bind(expression: string, bindVariable: string): SelectQuery;
    optional(optional: Optional): SelectQuery;
    nest(subQuery: SelectQuery, type?: nestedType): SelectQuery;
    groupBy(...groupByCriteria: string[]): SelectQuery;
    having(expression: string): SelectQuery;
    render(): string;
    private getPrefixes;
    private getSelectVariables;
    private getGraphPattern;
    private getOptionals;
    private getLimit;
    private getGroupByCriteria;
    private getOrderBy;
    private getOffset;
    private getBindVariables;
    private getNestedQueries;
    private getFirstLine;
}
export {};
