import Optional from './core/optional';
import SelectQuery from './core/select-query';

const selectQuery = () => {
  return new SelectQuery();
};

// TODO construct update

const optional = () => {
  return new Optional();
};

export default { selectQuery, optional };
