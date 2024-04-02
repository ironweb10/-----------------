import { DefinitionOptions } from '../jxt';
declare module './' {
    interface StreamFeatures {
        streamManagement?: boolean;
    }
}
export interface StreamManagementAck {
    type: 'ack';
    handled: number;
}
export interface StreamManagementRequest {
    type: 'request';
}
export interface StreamManagementEnable {
    type: 'enable';
    allowResumption?: boolean;
}
export interface StreamManagementEnabled {
    type: 'enabled';
    id: string;
    resume?: boolean;
}
export interface StreamManagementResume {
    type: 'resume' | 'resumed';
    handled: number;
    previousSession: string;
}
export interface StreamManagementFailed {
    type: 'failed';
    handled?: number;
}
export declare type StreamManagement = StreamManagementAck | StreamManagementRequest | StreamManagementEnable | StreamManagementEnabled | StreamManagementResume | StreamManagementFailed;
declare const Protocol: DefinitionOptions[];
export default Protocol;
