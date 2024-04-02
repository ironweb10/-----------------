import { Agent } from '../';
import { DataForm, IQ, Paging, Pubsub, PubsubAffiliation, PubsubAffiliations, PubsubCreate, PubsubEvent, PubsubEventConfiguration, PubsubEventDelete, PubsubEventItems, PubsubEventPurge, PubsubEventSubscription, PubsubFetchResult, PubsubItem, PubsubItemContent, PubsubSubscribeWithOptions, PubsubSubscription, PubsubSubscriptions, PubsubSubscriptionWithOptions, PubsubUnsubscribe, ReceivedMessage } from '../protocol';
declare module '../' {
    interface Agent {
        subscribeToNode(jid: string, opts: string | PubsubSubscribeWithOptions): Promise<PubsubSubscriptionWithOptions>;
        unsubscribeFromNode(jid: string, opts: string | PubsubUnsubscribeOptions): Promise<PubsubSubscription>;
        publish<T extends PubsubItemContent = PubsubItemContent>(jid: string, node: string, item: T, id?: string): Promise<IQ>;
        getItem<T extends PubsubItemContent = PubsubItemContent>(jid: string, node: string, id: string): Promise<PubsubItem<T>>;
        getItems<T extends PubsubItemContent = PubsubItemContent>(jid: string, node: string, opts?: Paging): Promise<PubsubFetchResult<T>>;
        retract(jid: string, node: string, id: string, notify: boolean): Promise<IQ>;
        purgeNode(jid: string, node: string): Promise<IQ>;
        deleteNode(jid: string, node: string): Promise<IQ>;
        createNode(jid: string, node?: string, config?: DataForm): Promise<PubsubCreate>;
        configureNode(jid: string, node: string, config: DataForm): Promise<IQ>;
        getNodeConfig(jid: string, node: string): Promise<DataForm>;
        getDefaultNodeConfig(jid: string): Promise<DataForm>;
        getDefaultSubscriptionOptions(jid: string): Promise<DataForm>;
        getSubscriptions(jid: string, opts?: PubsubSubscriptions): Promise<PubsubSubscriptions>;
        getAffiliations(jid: string, node?: string): Promise<IQ>;
        getNodeSubscribers(jid: string, node: string | PubsubSubscriptions, opts?: PubsubSubscriptions): Promise<IQ>;
        updateNodeSubscriptions(jid: string, node: string, delta: PubsubSubscription[]): Promise<IQ>;
        getNodeAffiliations(jid: string, node: string): Promise<PubsubAffiliations>;
        updateNodeAffiliations(jid: string, node: string, items: PubsubAffiliation[]): Promise<IQ>;
    }
    interface AgentEvents {
        'pubsub:event': PubsubEventMessage;
        'pubsub:published': PubsubPublish;
        'pubsub:retracted': PubsubRetract;
        'pubsub:purged': PubsubEventMessage & {
            pubsub: PubsubEventPurge;
        };
        'pubsub:deleted': PubsubEventMessage & {
            pubsub: PubsubEventDelete;
        };
        'pubsub:subscription': PubsubEventMessage & {
            pubsub: PubsubEventSubscription;
        };
        'pubsub:config': PubsubEventMessage & {
            pubsub: PubsubEventConfiguration;
        };
        'pubsub:affiliations': PubsubMessage & {
            pubsub: PubsubAffiliationChange;
        };
    }
}
export interface PubsubSubscribeOptions extends PubsubSubscribeWithOptions {
    useBareJID?: boolean;
}
export interface PubsubUnsubscribeOptions extends PubsubUnsubscribe {
    useBareJID?: boolean;
}
declare type PubsubMessage = ReceivedMessage & {
    pubsub: Pubsub;
};
declare type PubsubEventMessage = ReceivedMessage & {
    pubsub: PubsubEvent;
};
declare type PubsubPublish = PubsubEventMessage & {
    pubsub: PubsubEventItems & {
        items: {
            published: PubsubItem[];
        };
    };
};
declare type PubsubRetract = PubsubEventMessage & {
    pubsub: PubsubEventItems & {
        items: {
            retracted: PubsubItem[];
        };
    };
};
declare type PubsubAffiliationChange = PubsubMessage & {
    pubsub: Pubsub & {
        affiliations: PubsubAffiliations;
    };
};
export default function (client: Agent): void;
export {};
