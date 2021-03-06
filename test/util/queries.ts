const simpleSelect = `SELECT * WHERE {
  ?s ?p ?o .
}`;

const simpleSelectPredicateObject = simpleSelect.replace('*', '?p ?o');

const simpleSelectTwoStatements = `SELECT * WHERE {
  ?s ?p ?o .
  ?o ?p2 ?o2 .
}`;

const simpleSelectOffsetLimit = simpleSelect + ' OFFSET 10 LIMIT 5';

const simpleSelectOrderByPDesc = simpleSelect + ' ORDER BY DESC(?p)';

const simpleSelectWithBind = `SELECT * WHERE {
  BIND (<urn:uuid:1f6a009f-2028-46b2-ad6b-a3f3e6cb7b11> as ?entityId) .
  BIND (120*2 as ?calcVar) .
  ?s ?p ?o .
}`;

const simpleOptionalQuery = `SELECT * WHERE {
  ?s ?p ?o .
  OPTIONAL {
    ?o ?p2 ?o2 .
  }
}`;

const simpleSelectWithPrefix = 'PREFIX schema: <http://schema.org/>\n' + simpleSelect;

const simpleNestedQuery = `PREFIX schema: <http://schema.org/>
SELECT * WHERE {
  {
    SELECT ?s WHERE {
      ?s schema:name 'sparql-builder' .
    }
  }
}`;

const doubleNestedQuery = `PREFIX schema: <http://schema.org/>
SELECT * WHERE {
  {
    SELECT * WHERE {
      {
        SELECT ?s WHERE {
          ?s schema:name 'sparql-builder' .
        }
      }
    }
  }
  {
    SELECT * WHERE {
      ?b schema:builder 'simple-query-builder' .
    }
  }
}`;

const groupByQuery = `PREFIX schema: <http://schema.org/>
SELECT ?location (SUM(?value1 * ?value2) as ?totalSum) WHERE {
  ?location schema:humidity ?value1 .
  ?location schema:temperature ?value2 .
} GROUP BY ?location HAVING (?totalSum > 10)`;

const unionQuery = `PREFIX schema: <http://schema.org/>
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
}`;

const optionalQuery = `PREFIX schema: <http://schema.org/>
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
}`;

export default {
  simpleSelect,
  simpleSelectPredicateObject,
  simpleSelectTwoStatements,
  simpleSelectOffsetLimit,
  simpleSelectOrderByPDesc,
  simpleSelectWithBind,
  simpleOptionalQuery,
  simpleSelectWithPrefix,
  simpleNestedQuery,
  doubleNestedQuery,
  groupByQuery,
  unionQuery,
  optionalQuery,
};
