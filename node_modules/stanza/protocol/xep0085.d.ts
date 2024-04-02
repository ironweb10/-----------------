import { ChatState } from '../Constants';
declare module './' {
    interface Message {
        chatState?: ChatState;
    }
}
declare const _default: import("../jxt").DefinitionOptions<any>;
export default _default;
