"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Namespaces_1 = require("../Namespaces");
function default_1(client) {
    client.disco.addFeature(Namespaces_1.NS_PEP_NOTIFY(Namespaces_1.NS_AVATAR_METADATA));
    client.on('pubsub:published', msg => {
        if (msg.pubsub.items.node !== Namespaces_1.NS_AVATAR_METADATA) {
            return;
        }
        const info = msg.pubsub.items.published[0].content;
        client.emit('avatar', {
            avatars: info.versions || [],
            jid: msg.from,
            source: 'pubsub'
        });
    });
    client.on('presence', pres => {
        if (pres.vcardAvatar && typeof pres.vcardAvatar === 'string') {
            client.emit('avatar', {
                avatars: [
                    {
                        id: pres.vcardAvatar
                    }
                ],
                jid: pres.from,
                source: 'vcard'
            });
        }
    });
    client.publishAvatar = (id, data) => {
        return client.publish('', Namespaces_1.NS_AVATAR_DATA, {
            data,
            itemType: Namespaces_1.NS_AVATAR_DATA
        }, id);
    };
    client.useAvatars = (versions, pointers = []) => {
        return client.publish('', Namespaces_1.NS_AVATAR_METADATA, {
            itemType: Namespaces_1.NS_AVATAR_METADATA,
            pointers,
            versions
        }, 'current');
    };
    client.getAvatar = (jid, id) => {
        return client.getItem(jid, Namespaces_1.NS_AVATAR_DATA, id);
    };
}
exports.default = default_1;
