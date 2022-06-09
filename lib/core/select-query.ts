import util from './util';
import Optional from './optional';

export default class SelectQuery {
  private readonly SELECT_KEYWORD = 'SELECT';
  private prefixes: string[] = [];
  private selectVariables: string[] = [];
  private graphPattern: Array<Array<string>> = [];
  private orderByValues: string[] = [];
  private offsetValue: number;
  private limitValue: number;
  private bindVariables: string[] = [];
  private optionals: Optional[] = [];
  private subQueries: SelectQuery[] = [];
  private groupByCriteria: string[] = [];

  constructor() {
    return this;
  }

  prefix(prefix: string): SelectQuery {
    this.prefixes.push(prefix);
    return this;
  }

  select(...variables: string[]): SelectQuery {
    this.selectVariables = variables;
    return this;
  }

  where(subject: string, predicate: string, object: string): SelectQuery {
    this.graphPattern.push([subject, predicate, object]);
    return this;
  }

  limit(limit: number): SelectQuery {
    this.limitValue = limit;
    return this;
  }

  offset(offset: number): SelectQuery {
    this.offsetValue = offset;
    return this;
  }

  orderBy(orderBy: string): SelectQuery {
    this.orderByValues.push(orderBy);
    return this;
  }

  bind(expression: string, bindVariable: string): SelectQuery {
    this.bindVariables.push(`BIND (${expression} as ${util.getQueryString(bindVariable)})`);
    return this;
  }

  optional(optional: Optional): SelectQuery {
    this.optionals.push(optional);
    return this;
  }

  nest(subQuery: SelectQuery): SelectQuery {
    this.subQueries.push(subQuery);
    return this;
  }

  groupBy(...groupByCriteria: string[]): SelectQuery {
    this.groupByCriteria = groupByCriteria;
    return this;
  }

  render(): string {
    return (
      this.getPrefixes() +
      this.SELECT_KEYWORD +
      this.getSelectVariables() +
      this.getGraphPattern() +
      this.getGroupByCriteria() +
      this.getOrderBy() +
      this.getOffset() +
      this.getLimit()
    );
  }

  private getPrefixes(): string {
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

  private getSelectVariables(): string {
    let vars = '';

    for (const varName of this.selectVariables) {
      vars += ' ' + util.getQueryString(varName);
    }

    return vars;
  }

  private getGraphPattern(): string {
    let whereClause = ' WHERE {';

    whereClause += this.getBindVariables();

    for (const statement of this.graphPattern) {
      const [subj, pred, obj] = statement;

      whereClause +=
        '\n' +
        util.IDENTATION +
        util.getQueryString(subj) +
        ' ' +
        util.getQueryString(pred) +
        ' ' +
        util.getQueryString(obj) +
        ' .';
    }

    whereClause += this.getNestedQueries();

    return whereClause + this.getOptionals() + '\n}';
  }

  private getOptionals(): string {
    if (!this.optionals.length) {
      return '';
    }

    let optionals = '';

    for (const o of this.optionals) {
      optionals += '\n' + o.render();
    }

    // hack to avoid identation on the end of previous row
    return '\n' + util.indentString(optionals.substr(1));
  }

  private getLimit(): string {
    if (this.limitValue) {
      return ' LIMIT ' + this.limitValue;
    }

    return '';
  }

  private getGroupByCriteria(): string {
    if (!this.groupByCriteria.length) {
      return '';
    }

    let groupBy = ' GROUP BY';

    for (const c of this.groupByCriteria) {
      groupBy += ' ' + util.getQueryString(c);
    }

    return groupBy;
  }

  private getOrderBy(): string {
    if (!this.orderByValues.length) {
      return '';
    }

    let orderByClause = ' ORDER BY';

    for (const orderBy of this.orderByValues) {
      orderByClause += ' ' + orderBy;
    }

    return orderByClause;
  }

  private getOffset(): string {
    if (this.offsetValue) {
      return ' OFFSET ' + this.offsetValue;
    }

    return '';
  }

  private getBindVariables(): string {
    if (!this.bindVariables.length) {
      return '';
    }

    let bindSection = '';

    for (const bind of this.bindVariables) {
      bindSection += '\n' + util.IDENTATION + bind + ' .';
    }

    return bindSection;
  }

  private getNestedQueries(): string {
    if (!this.subQueries.length) {
      return '';
    }

    let nested = '';

    for (const subQuery of this.subQueries) {
      nested += '\n' + util.IDENTATION + '{\n';
      nested += util.indentString(subQuery.render(), util.DOUBLE_INDENTATION);
      nested += '\n' + util.IDENTATION + '}';
    }

    return nested;
  }
}
