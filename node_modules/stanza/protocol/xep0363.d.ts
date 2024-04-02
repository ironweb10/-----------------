import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        httpUpload?: HTTPUploadRequest | HTTPUploadSlot;
    }
    interface StanzaError {
        httpUploadError?: 'file-too-large' | 'retry';
        httpUploadMaxFileSize?: number;
        httpUpoadRetry?: Date;
    }
}
export interface HTTPUploadRequest {
    type?: 'request';
    name: string;
    size: number;
    mediaType?: string;
}
export interface HTTPUploadSlot {
    type?: 'slot';
    upload: HTTPUploadLocation;
    download: string;
}
export interface HTTPUploadLocation {
    url: string;
    headers?: HTTPUploadHeader[];
}
export interface HTTPUploadHeader {
    name: string;
    value: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
