import { Agent } from '../';
import { CarbonMessage, DataForm, Message, MessageReceipt, ReceivedMessage, RTT } from '../protocol';
declare module '../' {
    interface Agent {
        getAttention(jid: string, opts?: Partial<Message>): void;
        enableCarbons(): Promise<void>;
        disableCarbons(): Promise<void>;
        markReceived(msg: Message): void;
        markDisplayed(msg: Message): void;
        markAcknowledged(msg: Message): void;
        sendMarker(msg: Message, marker: ChatMarkerLabel, force?: boolean): void;
    }
    interface AgentConfig {
        /**
         * Send Chat Markers
         *
         * When enabled, message display markers will automatically be sent when requested.
         *
         * @default true
         */
        chatMarkers?: boolean;
        /**
         * Chat Markers Use Stanza ID
         *
         * When enabled, chat markers for MUC messages will use the stanza ID stamped by the MUC,
         * if one is present.
         *
         * This option is intended to allow interop with some servers that stamp stanza IDs, but
         * also still rely on the plain message ID for tracking marker states.
         *
         * @default true
         */
        groupchatMarkersUseStanzaID?: boolean;
        /**
         * Send Message Delivery Receipts
         *
         * When enabled, message receipts will automatically be sent when requested.
         *
         * @default true
         */
        sendReceipts?: boolean;
        /**
         * Send Message Delivery Receipts in MUCs
         *
         * When enabled (in addition to enabling `sendReceipts`), message receipts will automatically
         * be sent when requested in a MUC room.
         *
         * @default true
         */
        sendMUCReceipts?: boolean;
    }
    interface AgentEvents {
        attention: ReceivedMessage;
        'carbon:received': ReceivedCarbon;
        'carbon:sent': SentCarbon;
        'chat:state': ChatStateMessage;
        dataform: FormsMessage;
        'marker:acknowledged': ReceivedMessage;
        'marker:displayed': ReceivedMessage;
        'marker:received': ReceivedMessage;
        receipt: ReceiptMessage;
        replace: CorrectionMessage;
        rtt: RTTMessage;
    }
}
export declare type ReceivedCarbon = ReceivedMessage & {
    carbon: CarbonMessage & {
        type: 'received';
    };
};
export declare type SentCarbon = ReceivedMessage & {
    carbon: CarbonMessage & {
        type: 'sent';
    };
};
export declare type ChatStateMessage = ReceivedMessage & {
    chatState: ReceivedMessage['chatState'];
};
export declare type ReceiptMessage = ReceivedMessage & {
    receipt: MessageReceipt;
};
export declare type CorrectionMessage = ReceivedMessage & {
    replace: ReceivedMessage['replace'];
};
export declare type RTTMessage = Message & {
    rtt: RTT;
};
export declare type FormsMessage = ReceivedMessage & {
    forms: DataForm[];
};
declare type ChatMarkerLabel = 'markable' | 'received' | 'displayed' | 'acknowledged';
export default function (client: Agent): void;
export {};
