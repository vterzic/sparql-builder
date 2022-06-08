import util from './util';

export default class Optional {
  private graphPattern: Array<Array<string>> = [];

  where(subject: string, predicate: string, object: string): Optional {
    this.graphPattern.push([subject, predicate, object]);
    return this;
  }

  render(): string {
    return this.getGraphPattern();
  }

  private getGraphPattern(): string {
    if (!this.graphPattern.length) return '';

    let graphPattern = 'OPTIONAL {';

    for (const statement of this.graphPattern) {
      const [subj, pred, obj] = statement;

      graphPattern +=
        '\n' +
        util.IDENTATION +
        util.getQueryString(subj) +
        ' ' +
        util.getQueryString(pred) +
        ' ' +
        util.getQueryString(obj) +
        ' .';
    }

    return graphPattern + '\n}';
  }
}
