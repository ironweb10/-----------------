import { Agent } from '../';
import { Credentials } from '../lib/sasl';
import { SASL } from '../protocol';
declare module '../' {
    interface Agent {
        getCredentials(): Promise<AgentConfig['credentials']>;
    }
    interface AgentConfig {
        /**
         * Account Credentials
         *
         * The <code>credentials</code> object is used to pass multiple credential values (not just a password).
         * These are primarily values that have been previously cached.
         *
         * If you only need to set a password, then the <code>password</code> config field can be used instead.
         */
        credentials?: Credentials;
    }
    interface AgentEvents {
        'auth:success'?: Credentials;
        'auth:failed': void;
        'credentials:update': Credentials;
        sasl: SASL;
    }
}
export default function (client: Agent): void;
