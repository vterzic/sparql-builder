import Optional from './core/optional';
import SelectQuery from './core/select-query';

class SparqlBuilder {
  public static selectQuery(): SelectQuery {
    return new SelectQuery();
  }

  public static optional(): Optional {
    return new Optional();
  }
}

export = SparqlBuilder;
