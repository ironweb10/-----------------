import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { NS_BOOKMARKS } from '../Namespaces';
import { PubsubItemContent } from './';
declare module './' {
    interface PrivateStorage {
        bookmarks?: BookmarkStorage;
    }
}
export interface BookmarkStorage extends PubsubItemContent {
    itemType?: typeof NS_BOOKMARKS;
    rooms?: MUCBookmark[];
}
export interface MUCBookmark {
    jid: JID;
    name?: string;
    nick?: string;
    autoJoin?: boolean;
    password?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
