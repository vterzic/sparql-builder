import Optional from './core/optional';
import SelectQuery from './core/select-query';

const selectQuery = (): SelectQuery => {
  return new SelectQuery();
};

// TODO construct update

const optional = (): Optional => {
  return new Optional();
};

export = { selectQuery, optional };
