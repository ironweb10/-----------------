import { JingleAction, JingleContentSenders, JingleErrorCondition, JingleReasonCondition, JingleSessionRole } from '../Constants';
import { JID } from '../JID';
import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        jingle?: Jingle;
    }
    interface StanzaError {
        jingleError?: JingleErrorCondition;
    }
}
export interface Jingle {
    action?: JingleAction;
    initiator?: JID;
    responder?: JID;
    sid: string;
    contents?: JingleContent[];
    reason?: JingleReason;
    info?: JingleInfo;
}
export interface JingleContent {
    creator: JingleSessionRole;
    name: string;
    disposition?: string;
    senders?: JingleContentSenders;
    application?: JingleApplication;
    transport?: JingleTransport;
    security?: JingleSecurity;
}
export interface JingleReason {
    condition: JingleReasonCondition;
    alternativeSession?: string;
    text?: string;
}
export interface JingleApplication {
    applicationType: string;
}
export interface JingleTransport {
    transportType: string;
}
export interface JingleSecurity {
    securityType: string;
}
export interface JingleInfo {
    infoType: string;
    creator?: JingleSessionRole;
    name?: string;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
