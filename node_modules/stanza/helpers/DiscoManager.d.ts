import { DataForm, DiscoInfoIdentity, DiscoItem, LegacyEntityCaps } from '../protocol';
export interface DiscoNodeInfo {
    features: string[];
    identities: DiscoInfoIdentity[];
    extensions: DataForm[];
}
export default class Disco {
    features: Map<string, Set<string>>;
    identities: Map<string, DiscoInfoIdentity[]>;
    extensions: Map<string, DataForm[]>;
    items: Map<string, DiscoItem[]>;
    caps: Map<string, LegacyEntityCaps>;
    capsAlgorithms: string[];
    constructor();
    getNodeInfo(node: string): DiscoNodeInfo;
    addFeature(feature: string, node?: string): void;
    addIdentity(identity: DiscoInfoIdentity, node?: string): void;
    addItem(item: DiscoItem, node?: string): void;
    addExtension(form: DataForm, node?: string): void;
    updateCaps(node: string, algorithms?: string[]): LegacyEntityCaps[] | undefined;
    getCaps(): LegacyEntityCaps[];
}
