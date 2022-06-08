import { expect } from 'chai';
import Op from '../lib/core/operators';

describe('Util suite', () => {
  it('wraps variable into ASC()', () => {
    expect(Op.asc('var')).to.be.eq('ASC(?var)');
  });

  it('wraps variable into DESC()', () => {
    expect(Op.desc('var')).to.be.eq('DESC(?var)');
  });

  it('creates <iri> if raw value is passed', () => {
    expect(Op.iri('value')).to.be.eq('<value>');
  });

  it('returns <iri> if <iri> is passed', () => {
    expect(Op.iri('<value>')).to.be.eq('<value>');
  });

  it('returns IF(expression1, expression2, expression3', () => {
    expect(Op.ifFunc('?a > 5', "'yes'", "'no'")).to.be.eq("IF(?a > 5, 'yes', 'no')");
  });

  it('creates prefix based on prefixName and iri', () => {
    expect(Op.prefix('schema', 'http://schema.org/')).to.be.eq(
      'PREFIX schema: <http://schema.org/>',
    );
  });

  it('wraps string in single quotes (makes string literal)', () => {
    expect(Op.toStringLiteral('value')).to.be.equal("'value'");
  });
});
