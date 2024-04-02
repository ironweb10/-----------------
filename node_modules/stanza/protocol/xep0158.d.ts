import { DefinitionOptions } from '../jxt';
import { DataForm } from './';
declare module './' {
    interface Message {
        captcha?: DataForm;
    }
    interface IQPayload {
        captcha?: DataForm;
    }
}
declare const Protocol: DefinitionOptions[];
export default Protocol;
