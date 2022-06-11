import Optional from './core/optional';
import SelectQuery from './core/select-query';
import operators from './core/operators';
declare const builder: {
    selectQuery: () => SelectQuery;
    optional: () => Optional;
};
export { builder, operators };
