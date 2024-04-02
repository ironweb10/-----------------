import { Agent } from '../';
import { Geolocation, IQ, UserActivity, UserMood, UserTune } from '../protocol';
declare module '../' {
    interface Agent {
        publishActivity(data: UserActivity): Promise<IQ>;
        publishGeoLoc(data: Geolocation): Promise<IQ>;
        publishMood(mood: UserMood): Promise<IQ>;
        publishNick(nick: string): Promise<IQ>;
        publishTune(tune: UserTune): Promise<IQ>;
    }
    interface AgentEvents {
        activity: UserActivityEvent;
        geoloc: UserLocationEvent;
        mood: UserMoodEvent;
        nick: UserNickEvent;
        tune: UserTuneEvent;
    }
}
export interface UserActivityEvent {
    jid: string;
    activity: UserActivity;
}
export interface UserTuneEvent {
    tune: UserTune;
    jid: string;
}
export interface UserNickEvent {
    jid: string;
    nick?: string;
}
export interface UserMoodEvent {
    jid: string;
    mood?: UserMood;
}
export interface UserLocationEvent {
    geoloc: Geolocation;
    jid: string;
}
export default function (client: Agent): void;
