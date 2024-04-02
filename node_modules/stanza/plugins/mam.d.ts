import { Agent } from '../';
import { DataForm, IQ, MAMFin, MAMPrefs, MAMQuery, ReceivedMessage } from '../protocol';
declare module '../' {
    interface Agent {
        getHistorySearchForm(jid: string): Promise<DataForm>;
        getHistoryPreferences(): Promise<MAMPrefs>;
        setHistoryPreferences(opts: Partial<MAMPrefs>): Promise<IQ>;
        searchHistory(opts: Partial<MAMQueryOptions>): Promise<MAMFin>;
        searchHistory(jid: string, opts: Partial<MAMQueryOptions>): Promise<MAMFin>;
    }
    interface AgentEvents {
        'mam:item': ReceivedMessage;
    }
}
export interface MAMQueryOptions extends MAMQuery {
    with?: string;
    start?: Date;
    end?: Date;
}
export default function (client: Agent): void;
