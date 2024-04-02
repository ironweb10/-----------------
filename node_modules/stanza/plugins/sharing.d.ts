import { Agent } from '../';
import { Bits, HTTPUploadRequest, HTTPUploadSlot } from '../protocol';
declare module '../' {
    interface Agent {
        getBits(jid: string, cid: string): Promise<Bits>;
        getUploadService(domain?: string): Promise<{
            maxSize?: number;
            jid: string;
        }>;
        getUploadSlot(jid: string, request: HTTPUploadRequest): Promise<HTTPUploadSlot>;
    }
}
export default function (client: Agent): void;
