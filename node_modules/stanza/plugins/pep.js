"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Namespaces_1 = require("../Namespaces");
function default_1(client) {
    client.disco.addFeature(Namespaces_1.NS_ACTIVITY);
    client.disco.addFeature(Namespaces_1.NS_GEOLOC);
    client.disco.addFeature(Namespaces_1.NS_MOOD);
    client.disco.addFeature(Namespaces_1.NS_NICK);
    client.disco.addFeature(Namespaces_1.NS_TUNE);
    client.disco.addFeature(Namespaces_1.NS_PEP_NOTIFY(Namespaces_1.NS_ACTIVITY));
    client.disco.addFeature(Namespaces_1.NS_PEP_NOTIFY(Namespaces_1.NS_GEOLOC));
    client.disco.addFeature(Namespaces_1.NS_PEP_NOTIFY(Namespaces_1.NS_MOOD));
    client.disco.addFeature(Namespaces_1.NS_PEP_NOTIFY(Namespaces_1.NS_NICK));
    client.disco.addFeature(Namespaces_1.NS_PEP_NOTIFY(Namespaces_1.NS_TUNE));
    client.publishActivity = (data) => {
        return client.publish('', Namespaces_1.NS_ACTIVITY, {
            itemType: Namespaces_1.NS_ACTIVITY,
            ...data
        });
    };
    client.publishGeoLoc = (data) => {
        return client.publish('', Namespaces_1.NS_GEOLOC, {
            itemType: Namespaces_1.NS_GEOLOC,
            ...data
        });
    };
    client.publishMood = (mood) => {
        return client.publish('', Namespaces_1.NS_MOOD, {
            itemType: Namespaces_1.NS_MOOD,
            ...mood
        });
    };
    client.publishNick = (nick) => {
        return client.publish('', Namespaces_1.NS_NICK, {
            itemType: Namespaces_1.NS_NICK,
            nick
        });
    };
    client.publishTune = (tune) => {
        return client.publish('', Namespaces_1.NS_TUNE, {
            itemType: Namespaces_1.NS_TUNE,
            ...tune
        });
    };
    client.on('pubsub:published', msg => {
        const content = msg.pubsub.items.published[0].content;
        switch (msg.pubsub.items.node) {
            case Namespaces_1.NS_ACTIVITY:
                return client.emit('activity', {
                    activity: content,
                    jid: msg.from
                });
            case Namespaces_1.NS_GEOLOC:
                return client.emit('geoloc', {
                    geoloc: content,
                    jid: msg.from
                });
            case Namespaces_1.NS_MOOD:
                return client.emit('mood', {
                    jid: msg.from,
                    mood: content
                });
            case Namespaces_1.NS_NICK:
                return client.emit('nick', {
                    jid: msg.from,
                    nick: content.nick
                });
            case Namespaces_1.NS_TUNE:
                return client.emit('tune', {
                    jid: msg.from,
                    tune: msg.pubsub.items.published[0].content
                });
        }
    });
}
exports.default = default_1;
