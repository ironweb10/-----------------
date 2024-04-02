import { DefinitionOptions } from '../jxt';
declare module './' {
    interface IQPayload {
        visiblity?: Visibility;
    }
}
export interface Visibility {
    type: 'visible' | 'invisible';
    probe?: boolean;
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
