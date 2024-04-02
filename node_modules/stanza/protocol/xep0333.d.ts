import { DefinitionOptions } from '../jxt';
declare module './' {
    interface Message {
        marker?: ChatMarker;
    }
}
export interface ChatMarker {
    type: 'markable' | 'received' | 'displayed' | 'acknowledged';
    id?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
