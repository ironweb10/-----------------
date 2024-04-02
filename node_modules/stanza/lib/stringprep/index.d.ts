export declare class Table {
    name: string;
    singles: Set<number>;
    ranges: Array<[number, number]>;
    mappings: Map<number, null | number | number[]>;
    constructor(name: string, points?: number[]);
    contains(codePoint: number): boolean;
    hasMapping(codePoint: number): boolean;
    map(codePoint: number): number | number[] | null;
}
export declare const A1: Table;
export declare const B1: Table;
export declare const B2: Table;
export declare const B3: Table;
export declare const C11: Table;
export declare const C12: Table;
export declare const C21: Table;
export declare const C22: Table;
export declare const C3: Table;
export declare const C4: Table;
export declare const C5: Table;
export declare const C6: Table;
export declare const C7: Table;
export declare const C8: Table;
export declare const C9: Table;
export declare const D1: Table;
export declare const D2: Table;
interface StringPrepProfile {
    bidirectional: boolean;
    normalize: boolean;
    unassigned: Table;
    mappings: Table[];
    prohibited: Table[];
}
export declare function prepare(profile: StringPrepProfile, allowUnassigned: boolean, input?: string): string;
export declare function nameprep(str?: string, allowUnassigned?: boolean): string;
export declare const NodePrepProhibited: Table;
export declare function nodeprep(str?: string, allowUnassigned?: boolean): string;
export declare function resourceprep(str?: string, allowUnassigned?: boolean): string;
export declare function saslprep(str?: string, allowUnassigned?: boolean): string;
export {};
