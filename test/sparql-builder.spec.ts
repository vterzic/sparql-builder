import { expect } from 'chai';
import Optional from '../lib/core/optional';
import SelectQuery from '../lib/core/select-query';
import { builder } from '../lib/sparql-builder';

describe('sparql-builder suite', () => {
  it('creates SelectQuery instance', () => {
    const instance = builder.selectQuery();
    expect(instance).to.be.instanceOf(SelectQuery);
  });

  it('creates Optional instance', () => {
    const instance = builder.optional();
    expect(instance).to.be.instanceOf(Optional);
  });
});
