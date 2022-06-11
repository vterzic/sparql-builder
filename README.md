# sparql-builder

Just a simple, zero-dependency library for creating SPARQL queries.

## Motivation

This library was made for fun and mostly personal usage in order to speed up development process when creation of SPARQL queries is needed.

## TODO

- ~~SELECT Query~~
- CONSTRUCT Query
- UPDATE Query


## Examples

Examples can also be found in ./test/select-query.spec.ts

### Simple select

```
SELECT * WHERE {
  ?s ?p ?o .
}
```
```
const q = new Select()
    .select('*')
    .where('s', 'p', 'o');

q.render();
```

### Simple select with variables
```
SELECT ?s ?p WHERE {
  ?s ?p ?o .
}
```
```
const q = builder.selectQuery()
        .select('s', 'p')
        .where('s', 'p', 'o');

q.render();
```

### Select with optionals
```
SELECT * WHERE {
  ?s ?p ?o .
  OPTIONAL {
    ?o ?p2 ?o2 .
    ?o ?p3 ?o3 .
  }
}
```
```
const q = builder.selectQuery()
.select('*')
.where('s', 'p', 'o')
.optional(
    builder
        .optional()
        .where('o', 'p2', 'o2')
        .where('o', 'p3', 'o3')
);

q.render();
```

### Select with offset and limit
```
SELECT ?s ?p WHERE {
  ?s ?p ?o .
} OFFSET 5 LIMIT 10
```
```
const q = builder.selectQuery()
        .select('s', 'p')
        .where('s', 'p', 'o')
        .offset(5)
        .limit(10);

q.render();
```

### Group by query
```
SELECT ?location (SUM(?amount) as ?totalAmount) WHERE {
  ?location schema:amount ?amount .
} GROUP BY ?location OFFSET 5 LIMIT 10
```
```
const q = builder.selectQuery()
        .prefix(op.prefix('schema', op.iri('http://schema.org/')))
        .select('location', op.sum('?amount', 'totalAmount'))
        .where('location', 'schema:amount', '?amount')
        .groupBy('location')
        .offset(5)
        .limit(10);
        
q.render();
```

### Order by
```
SELECT * WHERE {
  ?s ?p ?o .
} ORDER BY DESC(?p) ASC(?o)
```
```
const q = builder.selectQuery()
.select('*')
.where('s', 'p', 'o')
.orderBy(op.desc('p'))
.orderBy(op.asc('o'));
```

### Nested query (subquery)
```
PREFIX schema: <http://schema.org/>
SELECT * WHERE {
  {
    SELECT ?s WHERE {
      BIND ('sparql-builder' as ?varName) .
      ?s schema:name ?varName .
    }
  }
}
```
```
const q = const q = builder.selectQuery()
    .prefix(op.prefix('schema', 'http://schema.org/'))
    .select('*')
    .nest(
        builder.selectQuery()
            .bind(op.toStringLiteral('sparql-builder'), 'varName')
            .select('s')
            .where('s', 'schema:name', 'varName'),
    );


q.render();
```

### Nested queries UNION
```
PREFIX schema: <http://schema.org/>
SELECT * WHERE {
  {
    SELECT ?s WHERE {
      ?s schema:name 'example1' .
    }
  }
  UNION
  {
    SELECT ?s WHERE {
      ?s schema:lastName 'example2' .
    }
  }
}
```
```
const subQuery1 = builder.selectQuery()
    .select('s')
    .where('s', 'schema:name', op.toStringLiteral('example1'));
const subQuery2 = builder.selectQuery()
    .select('s')
    .where('s', 'schema:lastName', op.toStringLiteral('example2'));

const q = builder.selectQuery()
    .prefix(op.prefix('schema', 'http://schema.org/'))
    .select('*')
    .nest(subQuery1)
    .nest(subQuery2, 'UNION');

q.render();
```

### Nested queries optional
```
PREFIX schema: <http://schema.org/>
SELECT * WHERE {
  {
    SELECT ?s WHERE {
      ?s schema:name 'example1' .
    }
  }
  OPTIONAL {
    SELECT ?s WHERE {
      ?s schema:lastName 'example2' .
    }
  }
}
```
```
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

q.redner();
```