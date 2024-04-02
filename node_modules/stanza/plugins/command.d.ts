import { Agent } from '../';
import { DiscoItemsResult } from '../protocol';
declare module '../' {
    interface Agent {
        getCommands(jid?: string): Promise<DiscoItemsResult>;
    }
}
export default function (client: Agent): void;
