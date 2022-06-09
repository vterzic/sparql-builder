import { expect } from 'chai';
import Optional from '../lib/core/optional';
import SelectQuery from '../lib/core/select-query';
import sparqlBuilder from '../lib/sparql-builder';

describe('sparql-builder suite', () => {
  it('creates SelectQuery instance', () => {
    const instance = sparqlBuilder.selectQuery();
    expect(instance).to.be.instanceOf(SelectQuery);
  });

  it('creates Optional instance', () => {
    const instance = sparqlBuilder.optional();
    expect(instance).to.be.instanceOf(Optional);
  });
});
