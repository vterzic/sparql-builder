import Optional from './core/optional';
import SelectQuery from './core/select-query';

const select = () => {
  return new SelectQuery();
};

const optional = () => {
  return new Optional();
};

export default { select, optional };
