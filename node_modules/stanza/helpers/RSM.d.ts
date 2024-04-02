import { Paging } from '../protocol/xep0059';
declare type RSMQuery<T> = (page: Paging) => Promise<{
    results: T[];
    paging: Paging;
}>;
interface RSMOptions<T> {
    pageSize?: number;
    direction?: 'forward' | 'backward';
    reverse?: boolean;
    before?: string;
    after?: string;
    max?: number;
    query: RSMQuery<T>;
}
export declare class ResultSetPager<T> {
    private query;
    private cursor;
    private direction;
    private reverse;
    private pageSize;
    private resultCount?;
    private resultComplete;
    private fetchedCount;
    private yieldedCount;
    constructor(opts: RSMOptions<T>);
    [Symbol.asyncIterator](): AsyncGenerator<T>;
    size(): Promise<number | undefined>;
    queryCompleted(): boolean;
    finished(): boolean;
    private fetchPage;
}
export declare function createPager<T>(opts: RSMOptions<T>): ResultSetPager<T>;
export {};
