declare module './' {
    interface Message {
        processingHints?: ProcessingHints;
    }
}
export interface ProcessingHints {
    noCopy?: boolean;
    noPermanentStore?: boolean;
    noStore?: boolean;
    store?: boolean;
}
declare const _default: import("../jxt").DefinitionOptions<any>;
export default _default;
