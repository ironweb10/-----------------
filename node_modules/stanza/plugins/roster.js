"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JID = tslib_1.__importStar(require("../JID"));
function default_1(client) {
    client.on('iq:set:roster', iq => {
        const allowed = JID.allowedResponders(client.jid);
        if (!allowed.has(iq.from)) {
            return client.sendIQError(iq, {
                error: {
                    condition: 'service-unavailable',
                    type: 'cancel'
                }
            });
        }
        client.emit('roster:update', iq);
        client.sendIQResult(iq);
    });
    client.on('iq:set:blockList', iq => {
        const allowed = JID.allowedResponders(client.jid);
        if (!allowed.has(iq.from)) {
            return client.sendIQError(iq, {
                error: {
                    condition: 'service-unavailable',
                    type: 'cancel'
                }
            });
        }
        const blockList = iq.blockList;
        client.emit(blockList.action, {
            jids: blockList.jids || []
        });
        client.sendIQResult(iq);
    });
    client.getRoster = async () => {
        const resp = await client.sendIQ({
            roster: {
                version: client.config.rosterVer
            },
            type: 'get'
        });
        if (resp.roster) {
            const version = resp.roster.version;
            if (version) {
                client.config.rosterVer = version;
                client.emit('roster:ver', version);
            }
            resp.roster.items = resp.roster.items || [];
            return resp.roster;
        }
        else {
            return { items: [] };
        }
    };
    client.updateRosterItem = async (item) => {
        await client.sendIQ({
            roster: {
                items: [item]
            },
            type: 'set'
        });
    };
    client.removeRosterItem = (jid) => {
        return client.updateRosterItem({ jid, subscription: 'remove' });
    };
    client.subscribe = (jid) => {
        client.sendPresence({ type: 'subscribe', to: jid });
    };
    client.unsubscribe = (jid) => {
        client.sendPresence({ type: 'unsubscribe', to: jid });
    };
    client.acceptSubscription = (jid) => {
        client.sendPresence({ type: 'subscribed', to: jid });
    };
    client.denySubscription = (jid) => {
        client.sendPresence({ type: 'unsubscribed', to: jid });
    };
    client.getBlocked = async () => {
        const result = await client.sendIQ({
            blockList: {
                action: 'list'
            },
            type: 'get'
        });
        return {
            jids: [],
            ...result.blockList
        };
    };
    async function toggleBlock(action, jid) {
        await client.sendIQ({
            blockList: {
                action,
                jids: [jid]
            },
            type: 'set'
        });
    }
    client.block = async (jid) => toggleBlock('block', jid);
    client.unblock = async (jid) => toggleBlock('unblock', jid);
    client.goInvisible = async (probe = false) => {
        await client.sendIQ({
            type: 'set',
            visiblity: {
                probe,
                type: 'invisible'
            }
        });
    };
    client.goVisible = async () => {
        await client.sendIQ({
            type: 'set',
            visiblity: {
                type: 'visible'
            }
        });
    };
}
exports.default = default_1;
