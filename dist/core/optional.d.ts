export default class Optional {
    private graphPattern;
    where(subject: string, predicate: string, object: string): Optional;
    render(): string;
    private getGraphPattern;
}
