/// <reference types="node" />
import { DefinitionOptions } from '../jxt';
import { NS_AVATAR_DATA, NS_AVATAR_METADATA } from '../Namespaces';
import { PubsubItemContent } from './';
export interface AvatarData extends PubsubItemContent {
    itemType?: typeof NS_AVATAR_DATA;
    data?: Buffer;
}
export interface AvatarMetaData extends PubsubItemContent {
    itemType?: typeof NS_AVATAR_METADATA;
    versions?: AvatarVersion[];
    pointers?: AvatarPointer[];
}
export interface AvatarVersion {
    bytes?: number;
    height?: number;
    width?: number;
    id: string;
    mediaType?: string;
    uri?: string;
}
export interface AvatarPointer {
    bytes?: number;
    height?: number;
    width?: number;
    id: string;
    mediaType?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
