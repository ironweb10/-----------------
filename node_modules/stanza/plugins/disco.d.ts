import { Agent } from '../';
import Disco, { DiscoNodeInfo } from '../helpers/DiscoManager';
import { DiscoInfoResult, DiscoItemsResult, LegacyEntityCaps, ReceivedIQGet } from '../protocol';
declare module '../' {
    interface Agent {
        disco: Disco;
        getDiscoInfo(jid?: string, node?: string): Promise<DiscoInfoResult>;
        getDiscoItems(jid?: string, node?: string): Promise<DiscoItemsResult>;
        updateCaps(): LegacyEntityCaps[] | undefined;
        getCurrentCaps(): {
            legacyCapabilities: LegacyEntityCaps[];
            info: DiscoNodeInfo;
        } | undefined;
    }
    interface AgentConfig {
        /**
         * Entity Caps Disco Node
         *
         * The disco info node prefix to use for entity capability advertisements.
         *
         * @default "https://stanzajs.org"
         */
        capsNode?: string;
    }
    interface AgentEvents {
        'disco:caps': {
            caps: LegacyEntityCaps[];
            jid: string;
        };
        'iq:get:disco': ReceivedIQGet & {
            disco: Disco;
        };
    }
}
export default function (client: Agent): void;
