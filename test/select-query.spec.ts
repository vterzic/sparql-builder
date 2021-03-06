import { expect } from 'chai';
import queries from './util/queries';
import Op from '../lib/core/operators';

import Select from '../lib/core/select-query';
import Optional from '../lib/core/optional';
import SelectQuery from '../lib/core/select-query';

describe('Select query suite', () => {
  const urnUuid = 'urn:uuid:1f6a009f-2028-46b2-ad6b-a3f3e6cb7b11';

  it('generates simple select query with 1 statement', () => {
    const q = new Select().select('*').where('s', 'p', 'o');
    expect(q.render()).to.be.equal(queries.simpleSelect);
  });

  it('generates simple predicate/object select query with 1 statement', () => {
    const q = new Select().select('p', 'o').where('s', 'p', 'o');
    expect(q.render()).to.be.equal(queries.simpleSelectPredicateObject);
  });

  it('generates simple select query with two statements', () => {
    const q = new Select().select('*').where('s', 'p', 'o').where('o', 'p2', 'o2');
    expect(q.render()).to.be.equal(queries.simpleSelectTwoStatements);
  });

  it('generates simple select query with LIMIT 5', () => {
    const q = new Select().select('*').where('s', 'p', 'o').offset(10).limit(5);
    expect(q.render()).to.be.equal(queries.simpleSelectOffsetLimit);
  });

  it('generates simple select ordered by ?p DESC', () => {
    const q = new Select().select('*').where('s', 'p', 'o').orderBy(Op.desc('p'));
    expect(q.render()).to.be.equal(queries.simpleSelectOrderByPDesc);
  });

  it('adds bind directive to query', () => {
    const q = new Select()
      .select('*')
      .where('s', 'p', 'o')
      .bind(Op.iri(urnUuid), 'entityId')
      .bind('120*2', 'calcVar');
    expect(q.render()).to.be.equal(queries.simpleSelectWithBind);
  });

  it('adds adds optional query', () => {
    const q = new Select()
      .select('*')
      .where('s', 'p', 'o')
      .optional(new Optional().where('o', 'p2', 'o2'));

    expect(q.render()).to.be.equal(queries.simpleOptionalQuery);
  });

  it('generates simple query with schema.org prefix', () => {
    const q = new Select()
      .prefix(Op.prefix('schema', 'http://schema.org/'))
      .select('*')
      .where('s', 'p', 'o');

    expect(q.render()).to.be.equal(queries.simpleSelectWithPrefix);
  });

  it('nests query inside of parent query', () => {
    const q = new Select()
      .prefix(Op.prefix('schema', 'http://schema.org/'))
      .select('*')
      .nest(
        new Select().select('s').where('s', 'schema:name', Op.toStringLiteral('sparql-builder')),
      );

    expect(q.render()).to.be.equal(queries.simpleNestedQuery);
  });

  it('double nests query inside of parent query', () => {
    const q = new Select()
      .prefix(Op.prefix('schema', 'http://schema.org/'))
      .select('*')
      .nest(
        new Select()
          .select('*')
          .nest(
            new Select()
              .select('s')
              .where('s', 'schema:name', Op.toStringLiteral('sparql-builder')),
          ),
      )
      .nest(
        new Select()
          .select('*')
          .where('b', 'schema:builder', Op.toStringLiteral('simple-query-builder')),
      );

    expect(q.render()).to.be.equal(queries.doubleNestedQuery);
  });

  it('generates group by query', () => {
    const q = new SelectQuery()
      .prefix(Op.prefix('schema', 'http://schema.org/'))
      .select('location', Op.sum('?value1 * ?value2', 'totalSum'))
      .where('location', 'schema:humidity', 'value1')
      .where('location', 'schema:temperature', 'value2')
      .groupBy('location')
      .having('?totalSum > 10');

    expect(q.render()).to.be.equal(queries.groupByQuery);
  });

  it('generates union of two subqueries', () => {
    const subQuery1 = new SelectQuery()
      .select('s')
      .where('s', 'schema:name', Op.toStringLiteral('example1'));
    const subQuery2 = new SelectQuery()
      .select('s')
      .where('s', 'schema:lastName', Op.toStringLiteral('example2'));

    const q = new SelectQuery()
      .prefix(Op.prefix('schema', 'http://schema.org/'))
      .select('*')
      .nest(subQuery1)
      .nest(subQuery2, 'UNION');

    expect(q.render()).to.be.eq(queries.unionQuery);
  });

  it('generates two subqueries where one is optional', () => {
    const subQuery1 = new SelectQuery()
      .select('s')
      .where('s', 'schema:name', Op.toStringLiteral('example1'));
    const subQuery2 = new SelectQuery()
      .select('s')
      .where('s', 'schema:lastName', Op.toStringLiteral('example2'));

    const q = new SelectQuery()
      .prefix(Op.prefix('schema', 'http://schema.org/'))
      .select('*')
      .nest(subQuery1)
      .nest(subQuery2, 'OPTIONAL');

    expect(q.render()).to.be.eq(queries.optionalQuery);
  });
});
