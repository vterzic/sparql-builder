import { expect } from 'chai';
import Optional from '../lib/core/optional';

describe('Optional suite', () => {
  it('renders optional graph pattern', () => {
    const expected = `OPTIONAL {
  ?s ?p ?o .
  ?o ?p2 ?o2 .
}`;

    const o = new Optional().where('s', 'p', 'o').where('o', 'p2', 'o2');
    expect(o.render()).to.be.eq(expected);
  });
});
