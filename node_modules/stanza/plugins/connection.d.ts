import { Agent } from '../';
import { IQ, StreamManagement, StreamManagementAck, StreamManagementResume } from '../protocol';
export interface KeepAliveOptions {
    interval?: number;
    timeout?: number;
}
declare module '../' {
    interface Agent {
        _keepAliveInterval?: any;
        _keepAliveOptions?: KeepAliveOptions;
        markActive(): void;
        markInactive(): void;
        enableKeepAlive(opts?: KeepAliveOptions): void;
        disableKeepAlive(): void;
        ping(jid?: string): Promise<void>;
        _stopKeepAliveInterval(): void;
    }
    interface AgentEvents {
        sm: StreamManagement;
        'stream:management:ack': StreamManagementAck;
        'stream:management:resumed': StreamManagementResume;
        'iq:get:ping': IQ & {
            ping: boolean;
        };
    }
    interface AgentConfig {
        /**
         * Use Stream Management
         *
         * Controls if <a href="https://xmpp.org/extensions/xep-0198.html">XEP-0198: Stream Management</a>
         * is enabled for the session.
         *
         * Disabling stream management is <i>not</i> recommended.
         *
         * @default true
         */
        useStreamManagement?: boolean;
    }
}
export default function (client: Agent): void;
