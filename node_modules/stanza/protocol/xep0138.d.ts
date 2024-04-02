import { DefinitionOptions } from '../jxt';
declare module './' {
    interface StreamFeatures {
        compression?: CompressionFeature;
    }
}
export interface CompressionFeature {
    methods: string[];
}
export interface CompressionStart {
    type: 'start';
    method: string;
}
export interface CompressionFailure {
    type: 'failure';
    condition: 'unsupported-method' | 'setup-failed' | 'processing-failed';
}
export interface CompressionSuccess {
    type: 'success';
}
export declare type Compression = CompressionStart | CompressionFailure | CompressionSuccess;
declare const Protocol: DefinitionOptions[];
export default Protocol;
