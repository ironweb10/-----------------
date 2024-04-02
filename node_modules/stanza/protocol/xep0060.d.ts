import { PubsubErrorCondition } from '../Constants';
import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
import { DataForm, Paging } from './';
declare module './' {
    interface Message {
        pubsub?: PubsubEvent | Pubsub;
    }
    interface IQPayload {
        pubsub?: Pubsub;
    }
    interface StanzaError {
        pubsubError?: PubsubErrorCondition;
        pubsubUnsupportedFeature?: string;
    }
}
export interface Pubsub {
    context?: 'owner' | 'user';
    affiliations?: PubsubAffiliations;
    subscribe?: PubsubSubscribe;
    unsubscribe?: PubsubUnsubscribe;
    subscription?: PubsubSubscription;
    subscriptions?: PubsubSubscriptions;
    publishOptions?: DataForm;
    publish?: PubsubPublish;
    retract?: PubsubRetract;
    purge?: string;
    fetch?: PubsubFetch;
    create?: PubsubCreate | boolean;
    destroy?: PubsubDestroy;
    configure?: PubsubConfigure;
    defaultConfiguration?: PubsubDefaultConfiguration;
    defaultSubscriptionOptions?: PubsubDefaultSubscriptionOptions;
    subscriptionOptions?: PubsubSubscriptionOptions;
    paging?: Paging;
}
export interface PubsubCreate {
    node?: string;
}
export interface PubsubDestroy {
    node: string;
    redirect?: string;
}
export interface PubsubConfigure {
    node?: string;
    form?: DataForm;
}
export interface PubsubDefaultConfiguration {
    form?: DataForm;
}
export interface PubsubDefaultSubscriptionOptions {
    node?: string;
    form?: DataForm;
}
export interface PubsubSubscribe {
    node?: string;
    jid?: JID;
}
export interface PubsubSubscribeWithOptions {
    node?: string;
    jid?: JID;
    options?: DataForm;
}
export interface PubsubUnsubscribe {
    node?: string;
    jid?: JID;
    subid?: string;
}
export interface PubsubSubscription {
    node?: string;
    jid?: JID;
    subid?: string;
    state?: 'subscribed' | 'pending' | 'unconfigured' | 'none';
    configurable?: boolean;
    configurationRequired?: boolean;
}
export interface PubsubSubscriptionWithOptions extends PubsubSubscription {
    options?: DataForm;
}
export interface PubsubSubscriptions {
    node?: string;
    jid?: JID;
    items?: PubsubSubscription[];
}
declare type PubsubAffiliationState = 'member' | 'none' | 'outcast' | 'owner' | 'publisher' | 'publish-only';
export interface PubsubAffiliation {
    node?: string;
    affiliation?: PubsubAffiliationState;
    jid?: JID;
}
export interface PubsubAffiliations {
    node?: string;
    items?: PubsubAffiliation[];
}
export interface PubsubPublish {
    node?: string;
    item?: PubsubItem;
}
export interface PubsubItemContent {
    itemType?: string;
}
export interface PubsubItem<T extends PubsubItemContent = PubsubItemContent> {
    id?: string;
    publisher?: JID;
    content?: T;
}
export interface PubsubRetract {
    node: string;
    id: string;
    notify?: boolean;
}
export interface PubsubFetch<T extends PubsubItemContent = PubsubItemContent> {
    node: string;
    max?: number;
    items?: PubsubItem<T>[];
}
export interface PubsubFetchResult<T extends PubsubItemContent = PubsubItemContent> extends PubsubFetch<T> {
    paging?: Paging;
}
export interface PubsubSubscriptionOptions {
    node?: string;
    jid?: JID;
    subid?: string;
    form?: DataForm;
}
export interface PubsubEvent {
    context: 'event';
    eventType: 'items' | 'purge' | 'delete' | 'configuration' | 'subscription';
    items?: PubsubEventItems;
    purge?: PubsubEventPurge;
    delete?: PubsubEventDelete;
    configuration?: PubsubEventConfiguration;
    subscription?: PubsubEventSubscription;
}
export interface PubsubEventItems {
    node: string;
    retracted?: string[];
    published?: PubsubItem[];
}
export interface PubsubEventPurge {
    node: string;
}
export interface PubsubEventDelete {
    node: string;
    redirect?: string;
}
export interface PubsubEventConfiguration {
    node: string;
    form: DataForm;
}
export interface PubsubEventSubscription {
    node: string;
    jid: JID;
    subid?: string;
    state: 'subscribed' | 'pending' | 'unconfigured' | 'none';
    expires?: Date | 'presence';
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
