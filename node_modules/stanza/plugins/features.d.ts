import { Agent } from '../';
import { StreamFeatures } from '../protocol';
declare module '../' {
    interface Agent {
        features: {
            handlers: {
                [key: string]: FeatureHandler;
            };
            negotiated: {
                [key: string]: boolean;
            };
            order: Array<{
                name: string;
                priority: number;
            }>;
        };
        registerFeature(name: string, priority: number, handler: FeatureHandler): void;
    }
}
declare type FeatureHandler = (data: StreamFeatures, done: (cmd?: string, msg?: string) => void) => void;
export default function (client: Agent): void;
export {};
