import { DiscoInfo } from '../protocol';
export declare function generate(info: DiscoInfo, hashName: string): string | null;
export declare function verify(info: DiscoInfo, hashName: string, check: string): boolean;
