import { JINGLE_INFO_CHECKSUM_5, JINGLE_INFO_RECEIVED_5, JingleSessionRole } from '../Constants';
import { DefinitionOptions } from '../jxt';
import { NS_JINGLE_FILE_TRANSFER_4, NS_JINGLE_FILE_TRANSFER_5 } from '../Namespaces';
import { Hash, HashUsed, JingleApplication, JingleInfo, Thumbnail } from './';
export interface FileTransferDescription extends JingleApplication {
    applicationType: typeof NS_JINGLE_FILE_TRANSFER_5 | typeof NS_JINGLE_FILE_TRANSFER_4;
    file: FileDescription;
}
export interface FileDescription {
    name?: string;
    description?: string;
    mediaType?: string;
    size?: number;
    date?: Date;
    range?: FileRange;
    hashes?: Hash[];
    hashesUsed?: HashUsed[];
    thumbnails?: Thumbnail[];
}
export interface FileRange {
    offset?: number;
    length?: number;
}
export interface FileTransferInfo extends JingleInfo {
    infoType: typeof JINGLE_INFO_CHECKSUM_5 | typeof JINGLE_INFO_RECEIVED_5;
    creator?: JingleSessionRole;
    name: string;
    file?: FileDescription;
}
declare let Protocol: DefinitionOptions[];
export default Protocol;
