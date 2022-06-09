import { expect } from 'chai';
import Util from '../lib/core/util';
describe('Util suite', () => {
  it('appends question mark to variable name', () => {
    expect(Util.getQueryString('varName')).to.be.eq('?varName');
  });

  it("doesn't append question mark to variable name if it begins with ?", () => {
    expect(Util.getQueryString('?varName')).to.be.eq('?varName');
  });

  it("doesn't append question mark to variable name if * is passed", () => {
    expect(Util.getQueryString('*')).to.be.eq('*');
  });

  it("doesn't append question mark to variable name if url is passed", () => {
    expect(Util.getQueryString('schema:name')).to.be.eq('schema:name');
  });

  it("doesn't append question mark to variable name if string literal is passed", () => {
    expect(Util.getQueryString("'string'")).to.be.eq("'string'");
  });

  it("doesn't append question mark to variable name if number literal is passed", () => {
    expect(Util.getQueryString(123)).to.be.eq('123');
  });

  it('idents string', () => {
    const input = 'this string\nis idented';
    const expected = `  this string
  is idented`;

    expect(Util.indentString(input)).to.be.eq(expected);
  });

  it('considers (SUM(?something) as ?summed) as expression', () => {
    const expression = '(SUM(?something) as ?summed)';

    expect(Util.isExpression(expression)).to.be.true;
  });
});
