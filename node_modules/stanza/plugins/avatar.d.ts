/// <reference types="node" />
import { Agent } from '../';
import { AvatarData, AvatarPointer, AvatarVersion, IQ, PubsubItem } from '../protocol';
declare module '../' {
    interface Agent {
        publishAvatar(id: string, data: Buffer): Promise<IQ>;
        useAvatars(versions: AvatarVersion[], pointers?: AvatarPointer[]): Promise<IQ>;
        getAvatar(jid: string, id: string): Promise<PubsubItem<AvatarData>>;
    }
    interface AgentEvents {
        avatar: AvatarsEvent;
    }
}
export interface AvatarsEvent {
    avatars: AvatarVersion[];
    jid: string;
    source: 'pubsub' | 'vcard';
}
export default function (client: Agent): void;
