import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        time?: EntityTime;
    }
}
export interface EntityTime {
    utc?: Date;
    tzo?: number;
}
declare const Protocol: DefinitionOptions;
export default Protocol;
