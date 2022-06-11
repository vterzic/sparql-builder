import Optional from './core/optional';
import SelectQuery from './core/select-query';
import operators from './core/operators';

const builder = {
  selectQuery: (): SelectQuery => {
    return new SelectQuery();
  },
  optional: (): Optional => {
    return new Optional();
  },
};

// TODO construct update

export { builder, operators };
