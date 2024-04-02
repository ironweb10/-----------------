import { Agent } from '../';
import { EntityTime, IQ, LastActivity, ReceivedIQGet, SoftwareVersion } from '../protocol';
declare module '../' {
    interface Agent {
        getSoftwareVersion(jid: string): Promise<SoftwareVersion>;
        getTime(jid: string): Promise<EntityTime>;
        getLastActivity(jid: string): Promise<LastActivity>;
    }
    interface AgentConfig {
        /**
         * Software Version Info
         *
         * @default { name: "stanzajs.org" }
         */
        softwareVersion?: SoftwareVersion;
    }
    interface AgentEvents {
        'iq:get:softwareVersion': ReceivedIQGet & {
            softwareVersion: SoftwareVersion;
        };
        'iq:get:time': IQ & {
            time: EntityTime;
        };
    }
}
export default function (client: Agent): void;
