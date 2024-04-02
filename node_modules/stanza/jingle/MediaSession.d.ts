import { JingleReasonCondition, JingleSessionRole } from '../Constants';
import { Jingle, JingleReason } from '../protocol';
import ICESession, { ICESessionOpts } from './ICESession';
import { ActionCallback } from './Session';
export interface MediaSessionOpts extends ICESessionOpts {
    stream?: MediaStream;
}
export default class MediaSession extends ICESession {
    offerOptions: any;
    includesAudio: boolean;
    includesVideo: boolean;
    private _ringing;
    constructor(opts: MediaSessionOpts);
    get ringing(): boolean;
    set ringing(value: boolean);
    get streams(): MediaStream[];
    start(opts?: RTCOfferOptions | ActionCallback, next?: ActionCallback): Promise<void>;
    accept(opts?: RTCAnswerOptions | ActionCallback, next?: ActionCallback): Promise<void>;
    end(reason?: JingleReasonCondition | JingleReason, silent?: boolean): void;
    ring(): Promise<void>;
    mute(creator: JingleSessionRole, name?: string): Promise<void>;
    unmute(creator: JingleSessionRole, name?: string): Promise<void>;
    hold(): Promise<void>;
    resume(): Promise<void>;
    addTrack(track: MediaStreamTrack, stream: MediaStream, cb?: ActionCallback): Promise<void>;
    removeTrack(sender: RTCRtpSender, cb?: ActionCallback): Promise<void>;
    onAddTrack(track: MediaStreamTrack, stream: MediaStream): void;
    onRemoveTrack(track: MediaStreamTrack): void;
    protected onSessionInitiate(changes: Jingle, cb: ActionCallback): Promise<void>;
    protected onSessionTerminate(changes: Jingle, cb: ActionCallback): void;
    protected onSessionInfo(changes: Jingle, cb: ActionCallback): void;
}
