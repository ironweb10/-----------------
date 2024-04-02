/// <reference types="node" />
import { DefinitionOptions } from '../jxt';
import { NS_OMEMO_AXOLOTL_BUNDLES, NS_OMEMO_AXOLOTL_DEVICELIST } from '../Namespaces';
declare module './' {
    interface Message {
        omemo?: OMEMO;
    }
}
export interface OMEMO {
    header: {
        iv: Buffer;
        sid: number;
        keys: OMEMOKey[];
    };
    payload?: Buffer;
}
export interface OMEMOKey {
    preKey?: boolean;
    rid: number;
    value: Buffer;
}
export interface OMEMOPreKey {
    id: number;
    value: Buffer;
}
export interface OMEMODevice {
    itemType?: typeof NS_OMEMO_AXOLOTL_BUNDLES;
    identityKey: Buffer;
    preKeys: OMEMOPreKey[];
    signedPreKeyPublic: {
        id: number;
        value: Buffer;
    };
    signedPreKeySignature: Buffer;
}
export interface OMEMODeviceList {
    itemType?: typeof NS_OMEMO_AXOLOTL_DEVICELIST;
    devices: number[];
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
