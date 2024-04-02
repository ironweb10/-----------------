"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const stanza_shims_1 = require("stanza-shims");
const Jingle = tslib_1.__importStar(require("../jingle"));
const Namespaces_1 = require("../Namespaces");
function default_1(client) {
    const hasNativePeerConnection = !!stanza_shims_1.RTCPeerConnection;
    const defaultConfig = {
        advertiseAudio: hasNativePeerConnection,
        advertiseFileTransfer: hasNativePeerConnection,
        advertiseVideo: hasNativePeerConnection,
        bundlePolicy: 'balanced',
        hasRTCPeerConnection: hasNativePeerConnection,
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        iceTransportPolicy: 'all',
        rtcpMuxPolicy: 'require',
        trickleIce: true
    };
    const providedConfig = client.config.jingle;
    const config = {
        ...defaultConfig,
        ...providedConfig
    };
    const jingle = (client.jingle = new Jingle.SessionManager(config));
    const caps = [Namespaces_1.NS_JINGLE_1];
    if (config.hasRTCPeerConnection) {
        caps.push(Namespaces_1.NS_JINGLE_ICE_0, Namespaces_1.NS_JINGLE_ICE_UDP_1, Namespaces_1.NS_JINGLE_DTLS_SCTP_1, Namespaces_1.NS_JINGLE_DTLS_0, 'urn:ietf:rfc:5888' // Jingle Grouping Framework
        );
        if (config.trickleIce === false) {
            caps.push('urn:ietf:rfc:3264'); // ICE prefer batched candidates
        }
        if (config.advertiseAudio || config.advertiseVideo) {
            caps.push(Namespaces_1.NS_JINGLE_RTP_1, Namespaces_1.NS_JINGLE_RTP_RTCP_FB_0, Namespaces_1.NS_JINGLE_RTP_HDREXT_0, 'urn:ietf:rfc:5576' // Jingle Source Specific Media Attributes
            );
        }
        if (config.advertiseAudio) {
            caps.push(Namespaces_1.NS_JINGLE_RTP_AUDIO);
        }
        if (config.advertiseVideo) {
            caps.push(Namespaces_1.NS_JINGLE_RTP_VIDEO);
        }
        if (config.advertiseFileTransfer) {
            caps.push(Namespaces_1.NS_JINGLE_FILE_TRANSFER_4, Namespaces_1.NS_JINGLE_FILE_TRANSFER_5);
        }
    }
    for (const cap of caps) {
        client.disco.addFeature(cap);
    }
    const mappedEvents = [
        'outgoing',
        'incoming',
        'accepted',
        'terminated',
        'ringing',
        'mute',
        'unmute',
        'hold',
        'resumed'
    ];
    for (const event of mappedEvents) {
        jingle.on(event, (session, data) => {
            client.emit(('jingle:' + event), session, data);
        });
    }
    jingle.on('createdSession', data => {
        client.emit('jingle:created', data);
    });
    jingle.on('send', async (data) => {
        try {
            if (data.type === 'set') {
                const resp = await client.sendIQ(data);
                if (!resp.jingle) {
                    resp.jingle = {};
                }
                resp.jingle.sid = data.jingle.sid;
                jingle.process(resp);
            }
            if (data.type === 'result') {
                client.sendIQResult({ type: 'set', id: data.id, from: data.to }, data);
            }
            if (data.type === 'error') {
                client.sendIQError({ type: 'set', id: data.id, from: data.to }, data);
            }
        }
        catch (err) {
            if (!err.jingle) {
                err.jingle = data.jingle;
            }
            err.jingle.sid = data.jingle.sid;
            jingle.process(err);
        }
    });
    client.on('session:bound', (jid) => {
        jingle.selfID = jid;
    });
    client.on('iq:set:jingle', (data) => {
        jingle.process(data);
    });
    client.on('unavailable', (pres) => {
        jingle.endPeerSessions(pres.from, undefined, true);
    });
    client.getServices = async (jid, type, version) => {
        const resp = await client.sendIQ({
            externalServices: {
                type,
                version
            },
            to: jid,
            type: 'get'
        });
        const services = resp.externalServices;
        services.services = services.services || [];
        return services;
    };
    client.getServiceCredentials = async (jid, host, type, port, version) => {
        const resp = await client.sendIQ({
            externalServiceCredentials: {
                host,
                port,
                type,
                version
            },
            to: jid,
            type: 'get'
        });
        return resp.externalServiceCredentials;
    };
    client.discoverICEServers = async (opts = {}) => {
        try {
            const resp = await client.getServices(client.config.server, undefined, opts.version);
            const services = resp.services || [];
            const discovered = [];
            for (const service of services) {
                client.jingle.addICEServer(service);
            }
            return discovered;
        }
        catch (err) {
            return [];
        }
    };
}
exports.default = default_1;
