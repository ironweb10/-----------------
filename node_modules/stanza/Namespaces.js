"use strict";
// ================================================================
// RFCS
// ================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.NS_AVATAR_METADATA = exports.NS_AVATAR_DATA = exports.NS_ROSTER_DELIMITER = exports.NS_GEOLOC = exports.NS_AMP = exports.NS_INBAND_REGISTRATION = exports.NS_REGISTER = exports.NS_XHTML_IM = exports.NS_XHTML = exports.NS_HTTP_AUTH = exports.NS_OOB_TRANSFER = exports.NS_OOB = exports.NS_SOCKS5 = exports.NS_PUBSUB_OWNER = exports.NS_PUBSUB_EVENT = exports.NS_PUBSUB_ERRORS = exports.NS_PUBSUB = exports.NS_RSM = exports.NS_SEARCH = exports.NS_VCARD_TEMP = exports.NS_ADHOC_COMMANDS = exports.NS_PRIVATE = exports.NS_BOOKMARKS = exports.NS_IBB = exports.NS_MUC_USER = exports.NS_MUC_OWNER = exports.NS_MUC_ADMIN = exports.NS_MUC = exports.NS_ADDRESS = exports.NS_DISCO_ITEMS = exports.NS_DISCO_INFO = exports.NS_LEGACY_CHAT_EVENTS = exports.NS_PRIVACY = exports.NS_LAST_ACTIVITY = exports.NS_RPC = exports.NS_DATAFORM = exports.NS_FRAMING = exports.NS_SUBSCRIPTION_PREAPPROVAL = exports.NS_ROSTER_VERSIONING = exports.NS_ROSTER = exports.NS_STARTTLS = exports.NS_STREAMS = exports.NS_STREAM = exports.NS_STANZAS = exports.NS_SESSION = exports.NS_SERVER = exports.NS_SASL = exports.NS_CLIENT = exports.NS_BIND = exports.NS_ATOM = void 0;
exports.NS_JINGLE_FILE_TRANSFER_4 = exports.NS_JINGLE_FILE_TRANSFER_3 = exports.NS_SOFTWARE_INFO = exports.NS_BOB = exports.NS_ATTENTION_0 = exports.NS_DATAFORM_MEDIA = exports.NS_DISCO_EXTERNAL_2 = exports.NS_DISCO_EXTERNAL_1 = exports.NS_BOSH_XMPP = exports.NS_DELAY = exports.NS_TIME = exports.NS_PING = exports.NS_SMACKS_3 = exports.NS_BLOCKING_ERRORS = exports.NS_BLOCKING = exports.NS_INVISIBLE_0 = exports.NS_RECEIPTS = exports.NS_JINGLE_RAW_UDP_1 = exports.NS_JINGLE_ICE_UDP_1 = exports.NS_NICK = exports.NS_LANG_TRANS_ITEMS = exports.NS_LANG_TRANS = exports.NS_JINGLE_RTP_VIDEO = exports.NS_JINGLE_RTP_AUDIO = exports.NS_JINGLE_RTP_INFO_1 = exports.NS_JINGLE_RTP_ERRORS_1 = exports.NS_JINGLE_RTP_1 = exports.NS_JINGLE_ERRORS_1 = exports.NS_JINGLE_1 = exports.NS_PEP_NOTIFY = exports.NS_CAPTCHA = exports.NS_ALT_CONNECTIONS_XBOSH = exports.NS_ALT_CONNECTIONS_WEBSOCKET = exports.NS_VCARD_TEMP_UPDATE = exports.NS_REACH_0 = exports.NS_ROSTER_NOTES = exports.NS_ROSTER_EXCHANGE = exports.NS_DATAFORM_LAYOUT = exports.NS_COMPRESSION = exports.NS_COMPRESSION_FEATURE = exports.NS_SHIM = exports.NS_BOSH = exports.NS_DATAFORM_VALIDATION = exports.NS_TUNE = exports.NS_DISCO_LEGACY_CAPS = exports.NS_COMPONENT = exports.NS_ACTIVITY = exports.NS_MOOD = exports.NS_VERSION = exports.NS_CHAT_STATES = void 0;
exports.NS_OMEMO_AXOLOTL = exports.NS_SPOILER_0 = exports.NS_EME_0 = exports.NS_REFERENCE_0 = exports.NS_JINGLE_ICE_0 = exports.NS_JINGLE_HTTP_UPLOAD_0 = exports.NS_JINGLE_HTTP_0 = exports.NS_HTTP_UPLOAD_0 = exports.NS_SID_0 = exports.NS_JINGLE_PUB_1 = exports.NS_PUSH_0 = exports.NS_DELEGATION_1 = exports.NS_JINGLE_MSG_INITIATE_0 = exports.NS_CSI_0 = exports.NS_JINGLE_DTLS_SCTP_1 = exports.NS_JINGLE_RTP_SSMA_0 = exports.NS_JINGLE_GROUPING_0 = exports.NS_JSON_0 = exports.NS_HINTS = exports.NS_CHAT_MARKERS_0 = exports.NS_JINGLE_DTLS_0 = exports.NS_IDLE_1 = exports.NS_HATS_0 = exports.NS_MAM_2 = exports.NS_MAM_1 = exports.NS_MAM_0 = exports.NS_MAM_TMP = exports.NS_PSA = exports.NS_CORRECTION_0 = exports.NS_MUC_UNIQUE = exports.NS_RTT_0 = exports.NS_HASH_NAME = exports.NS_HASHES_2 = exports.NS_HASHES_1 = exports.NS_FORWARD_0 = exports.NS_JINGLE_RTP_HDREXT_0 = exports.NS_JINGLE_RTP_RTCP_FB_0 = exports.NS_CARBONS_2 = exports.NS_DECLOAKING_0 = exports.NS_THUMBS_1 = exports.NS_THUMBS_0 = exports.NS_JINGLE_RTP_ZRTP_1 = exports.NS_JINGLE_IBB_1 = exports.NS_JINGLE_SOCKS5_1 = exports.NS_SEC_LABEL_ESS_0 = exports.NS_SEC_LABEL_CATALOG_2 = exports.NS_SEC_LABEL_0 = exports.NS_MUC_DIRECT_INVITE = exports.NS_JINGLE_XML_0 = exports.NS_JINGLE_FILE_TRANSFER_5 = void 0;
exports.NS_JINGLE_RTP_MSID_0 = exports.NS_XRD = exports.NS_JSON_MESSAGE_0 = exports.NS_OMEMO_AXOLOTL_BUNDLE = exports.NS_OMEMO_AXOLOTL_BUNDLES = exports.NS_OMEMO_AXOLOTL_DEVICELIST = void 0;
// RFC 4287
exports.NS_ATOM = 'http://www.w3.org/2005/Atom';
// RFC 6120
exports.NS_BIND = 'urn:ietf:params:xml:ns:xmpp-bind';
exports.NS_CLIENT = 'jabber:client';
exports.NS_SASL = 'urn:ietf:params:xml:ns:xmpp-sasl';
exports.NS_SERVER = 'jabber:server';
exports.NS_SESSION = 'urn:ietf:params:xml:ns:xmpp-session';
exports.NS_STANZAS = 'urn:ietf:params:xml:ns:xmpp-stanzas';
exports.NS_STREAM = 'http://etherx.jabber.org/streams';
exports.NS_STREAMS = 'urn:ietf:params:xml:ns:xmpp-streams';
exports.NS_STARTTLS = 'urn:ietf:params:xml:ns:xmpp-tls';
// RFC 6121
exports.NS_ROSTER = 'jabber:iq:roster';
exports.NS_ROSTER_VERSIONING = 'urn:xmpp:features:rosterver';
exports.NS_SUBSCRIPTION_PREAPPROVAL = 'urn:xmpp:features:pre-approval';
// RFC 7395
exports.NS_FRAMING = 'urn:ietf:params:xml:ns:xmpp-framing';
// ================================================================
// XEPS
// ================================================================
// XEP-0004
exports.NS_DATAFORM = 'jabber:x:data';
// XEP-0009
exports.NS_RPC = 'jabber:iq:rpc';
// XEP-0012
exports.NS_LAST_ACTIVITY = 'jabber:iq:last';
// XEP-0016
exports.NS_PRIVACY = 'jabber:iq:privacy';
// XEP-0022
exports.NS_LEGACY_CHAT_EVENTS = 'jabber:x:event';
// XEP-0030
exports.NS_DISCO_INFO = 'http://jabber.org/protocol/disco#info';
exports.NS_DISCO_ITEMS = 'http://jabber.org/protocol/disco#items';
// XEP-0033
exports.NS_ADDRESS = 'http://jabber.org/protocol/address';
// XEP-0045
exports.NS_MUC = 'http://jabber.org/protocol/muc';
exports.NS_MUC_ADMIN = 'http://jabber.org/protocol/muc#admin';
exports.NS_MUC_OWNER = 'http://jabber.org/protocol/muc#owner';
exports.NS_MUC_USER = 'http://jabber.org/protocol/muc#user';
// XEP-0047
exports.NS_IBB = 'http://jabber.org/protocol/ibb';
// XEP-0048
exports.NS_BOOKMARKS = 'storage:bookmarks';
// XEP-0049
exports.NS_PRIVATE = 'jabber:iq:private';
// XEP-0050
exports.NS_ADHOC_COMMANDS = 'http://jabber.org/protocol/commands';
// XEP-0054
exports.NS_VCARD_TEMP = 'vcard-temp';
// XEP-0055
exports.NS_SEARCH = 'jabber:iq:search';
// XEP-0059
exports.NS_RSM = 'http://jabber.org/protocol/rsm';
// XEP-0060
exports.NS_PUBSUB = 'http://jabber.org/protocol/pubsub';
exports.NS_PUBSUB_ERRORS = 'http://jabber.org/protocol/pubsub#errors';
exports.NS_PUBSUB_EVENT = 'http://jabber.org/protocol/pubsub#event';
exports.NS_PUBSUB_OWNER = 'http://jabber.org/protocol/pubsub#owner';
// XEP-0065
exports.NS_SOCKS5 = 'http://jabber.org/protocol/bytestreams';
// XEP-0066
exports.NS_OOB = 'jabber:x:oob';
exports.NS_OOB_TRANSFER = 'jabber:iq:oob';
// XEP-0070
exports.NS_HTTP_AUTH = 'http://jabber.org/protocol/http-auth';
// XEP-0071
exports.NS_XHTML = 'http://www.w3.org/1999/xhtml';
exports.NS_XHTML_IM = 'http://jabber.org/protocol/xhtml-im';
// XEP-0077
exports.NS_REGISTER = 'jabber:iq:register';
exports.NS_INBAND_REGISTRATION = 'http://jabber.org/features/iq-register';
// XEP-0079
exports.NS_AMP = 'http://jabber.org/protocol/amp';
// XEP-0080
exports.NS_GEOLOC = 'http://jabber.org/protocol/geoloc';
// XEP-0083
exports.NS_ROSTER_DELIMITER = 'roster:delimiter';
// XEP-0084
exports.NS_AVATAR_DATA = 'urn:xmpp:avatar:data';
exports.NS_AVATAR_METADATA = 'urn:xmpp:avatar:metadata';
// XEP-0085
exports.NS_CHAT_STATES = 'http://jabber.org/protocol/chatstates';
// XEP-0092
exports.NS_VERSION = 'jabber:iq:version';
// XEP-0107
exports.NS_MOOD = 'http://jabber.org/protocol/mood';
// XEP-0108
exports.NS_ACTIVITY = 'http://jabber.org/protocol/activity';
// XEP-0114
exports.NS_COMPONENT = 'jabber:component:accept';
// XEP-0115
exports.NS_DISCO_LEGACY_CAPS = 'http://jabber.org/protocol/caps';
// XEP-0118
exports.NS_TUNE = 'http://jabber.org/protocol/tune';
// XEP-0122
exports.NS_DATAFORM_VALIDATION = 'http://jabber.org/protocol/xdata-validate';
// XEP-0124
exports.NS_BOSH = 'http://jabber.org/protocol/httpbind';
// XEP-0131
exports.NS_SHIM = 'http://jabber.org/protocol/shim';
// XEP-0138
exports.NS_COMPRESSION_FEATURE = 'http://jabber.org/features/compress';
exports.NS_COMPRESSION = 'http://jabber.org/protocol/compress';
// XEP-0141
exports.NS_DATAFORM_LAYOUT = 'http://jabber.org/protocol/xdata-layout';
// XEP-0144
exports.NS_ROSTER_EXCHANGE = 'http://jabber.org/protocol/rosterx';
// XEP-0145
exports.NS_ROSTER_NOTES = 'storage:rosternotes';
// XEP-0152
exports.NS_REACH_0 = 'urn:xmpp:reach:0';
// XEP-0153
exports.NS_VCARD_TEMP_UPDATE = 'vcard-temp:x:update';
// XEP-0156
exports.NS_ALT_CONNECTIONS_WEBSOCKET = 'urn:xmpp:alt-connections:websocket';
exports.NS_ALT_CONNECTIONS_XBOSH = 'urn:xmpp:alt-connections:xbosh';
// XEP-0158
exports.NS_CAPTCHA = 'urn:xmpp:captcha';
// XEP-0163
const NS_PEP_NOTIFY = (ns) => `${ns}+notify`;
exports.NS_PEP_NOTIFY = NS_PEP_NOTIFY;
// XEP-0166
exports.NS_JINGLE_1 = 'urn:xmpp:jingle:1';
exports.NS_JINGLE_ERRORS_1 = 'urn:xmpp:jingle:errors:1';
// XEP-0167
exports.NS_JINGLE_RTP_1 = 'urn:xmpp:jingle:apps:rtp:1';
exports.NS_JINGLE_RTP_ERRORS_1 = 'urn:xmpp:jingle:apps:rtp:errors:1';
exports.NS_JINGLE_RTP_INFO_1 = 'urn:xmpp:jingle:apps:rtp:info:1';
exports.NS_JINGLE_RTP_AUDIO = 'urn:xmpp:jingle:apps:rtp:audio';
exports.NS_JINGLE_RTP_VIDEO = 'urn:xmpp:jingle:apps:rtp:video';
// XEP-0171
exports.NS_LANG_TRANS = 'urn:xmpp:langtrans';
exports.NS_LANG_TRANS_ITEMS = 'urn:xmpp:langtrans:items';
// XEP-0172
exports.NS_NICK = 'http://jabber.org/protocol/nick';
// XEP-0176
exports.NS_JINGLE_ICE_UDP_1 = 'urn:xmpp:jingle:transports:ice-udp:1';
// XEP-0177
exports.NS_JINGLE_RAW_UDP_1 = 'urn:xmpp:jingle:transports:raw-udp:1';
// XEP-0184
exports.NS_RECEIPTS = 'urn:xmpp:receipts';
// XEP-0186
exports.NS_INVISIBLE_0 = 'urn:xmpp:invisible:0';
// XEP-0191
exports.NS_BLOCKING = 'urn:xmpp:blocking';
exports.NS_BLOCKING_ERRORS = 'urn:xmpp:blocking:errors';
// XEP-0198
exports.NS_SMACKS_3 = 'urn:xmpp:sm:3';
// XEP-0199
exports.NS_PING = 'urn:xmpp:ping';
// XEP-0202
exports.NS_TIME = 'urn:xmpp:time';
// XEP-0203
exports.NS_DELAY = 'urn:xmpp:delay';
// XEP-0206
exports.NS_BOSH_XMPP = 'urn:xmpp:xbosh';
// XEP-0215
exports.NS_DISCO_EXTERNAL_1 = 'urn:xmpp:extdisco:1';
exports.NS_DISCO_EXTERNAL_2 = 'urn:xmpp:extdisco:2';
// XEP-0221
exports.NS_DATAFORM_MEDIA = 'urn:xmpp:media-element';
// XEP-0224
exports.NS_ATTENTION_0 = 'urn:xmpp:attention:0';
// XEP-0231
exports.NS_BOB = 'urn:xmpp:bob';
// XEP-0232
exports.NS_SOFTWARE_INFO = 'urn:xmpp:dataforms:softwareinfo';
// XEP-0234
exports.NS_JINGLE_FILE_TRANSFER_3 = 'urn:xmpp:jingle:apps:file-transfer:3';
exports.NS_JINGLE_FILE_TRANSFER_4 = 'urn:xmpp:jingle:apps:file-transfer:4';
exports.NS_JINGLE_FILE_TRANSFER_5 = 'urn:xmpp:jingle:apps:file-transfer:5';
// XEP-0247
exports.NS_JINGLE_XML_0 = 'urn:xmpp:jingle:apps:xmlstream:0';
// XEP-0249
exports.NS_MUC_DIRECT_INVITE = 'jabber:x:conference';
// XEP-0258
exports.NS_SEC_LABEL_0 = 'urn:xmpp:sec-label:0';
exports.NS_SEC_LABEL_CATALOG_2 = 'urn:xmpp:sec-label:catalog:2';
exports.NS_SEC_LABEL_ESS_0 = 'urn:xmpp:sec-label:ess:0';
// XEP-0260
exports.NS_JINGLE_SOCKS5_1 = 'urn:xmpp:jingle:transports:s5b:1';
// XEP-0261
exports.NS_JINGLE_IBB_1 = 'urn:xmpp:jingle:transports:ibb:1';
// XEP-0262
exports.NS_JINGLE_RTP_ZRTP_1 = 'urn:xmpp:jingle:apps:rtp:zrtp:1';
// XEP-0264
exports.NS_THUMBS_0 = 'urn:xmpp:thumbs:0';
exports.NS_THUMBS_1 = 'urn:xmpp:thumbs:1';
// XEP-0276
exports.NS_DECLOAKING_0 = 'urn:xmpp:decloaking:0';
// XEP-0280
exports.NS_CARBONS_2 = 'urn:xmpp:carbons:2';
// XEP-0293
exports.NS_JINGLE_RTP_RTCP_FB_0 = 'urn:xmpp:jingle:apps:rtp:rtcp-fb:0';
// XEP-0294
exports.NS_JINGLE_RTP_HDREXT_0 = 'urn:xmpp:jingle:apps:rtp:rtp-hdrext:0';
// XEP-0297
exports.NS_FORWARD_0 = 'urn:xmpp:forward:0';
// XEP-0300
exports.NS_HASHES_1 = 'urn:xmpp:hashes:1';
exports.NS_HASHES_2 = 'urn:xmpp:hashes:2';
const NS_HASH_NAME = (name) => `urn:xmpp:hash-function-text-names:${name}`;
exports.NS_HASH_NAME = NS_HASH_NAME;
// XEP-0301
exports.NS_RTT_0 = 'urn:xmpp:rtt:0';
// XEP-0307
exports.NS_MUC_UNIQUE = 'http://jabber.org/protocol/muc#unique';
// XEP-308
exports.NS_CORRECTION_0 = 'urn:xmpp:message-correct:0';
// XEP-0310
exports.NS_PSA = 'urn:xmpp:psa';
// XEP-0313
exports.NS_MAM_TMP = 'urn:xmpp:mam:tmp';
exports.NS_MAM_0 = 'urn:xmpp:mam:0';
exports.NS_MAM_1 = 'urn:xmpp:mam:1';
exports.NS_MAM_2 = 'urn:xmpp:mam:2';
// XEP-0317
exports.NS_HATS_0 = 'urn:xmpp:hats:0';
// XEP-0319
exports.NS_IDLE_1 = 'urn:xmpp:idle:1';
// XEP-0320
exports.NS_JINGLE_DTLS_0 = 'urn:xmpp:jingle:apps:dtls:0';
// XEP-0333
exports.NS_CHAT_MARKERS_0 = 'urn:xmpp:chat-markers:0';
// XEP-0334
exports.NS_HINTS = 'urn:xmpp:hints';
// XEP-0335
exports.NS_JSON_0 = 'urn:xmpp:json:0';
// XEP-0338
exports.NS_JINGLE_GROUPING_0 = 'urn:xmpp:jingle:apps:grouping:0';
// XEP-0339
exports.NS_JINGLE_RTP_SSMA_0 = 'urn:xmpp:jingle:apps:rtp:ssma:0';
// XEP-0343
exports.NS_JINGLE_DTLS_SCTP_1 = 'urn:xmpp:jingle:transports:dtls-sctp:1';
// XEP-0352
exports.NS_CSI_0 = 'urn:xmpp:csi:0';
// XEP-0353
exports.NS_JINGLE_MSG_INITIATE_0 = 'urn:xmpp:jingle:jingle-message:0';
// XEP-0355
exports.NS_DELEGATION_1 = 'urn:xmpp:delegation:1';
// XEP-0357
exports.NS_PUSH_0 = 'urn:xmpp:push:0';
// XEP-0358
exports.NS_JINGLE_PUB_1 = 'urn:xmpp:jinglepub:1';
// XEP-0359
exports.NS_SID_0 = 'urn:xmpp:sid:0';
// XEP-0363
exports.NS_HTTP_UPLOAD_0 = 'urn:xmpp:http:upload:0';
// XEP-0370
exports.NS_JINGLE_HTTP_0 = 'urn:xmpp:jingle:transports:http:0';
exports.NS_JINGLE_HTTP_UPLOAD_0 = 'urn:xmpp:jingle:transports:http:upload:0';
// XEP-0371
exports.NS_JINGLE_ICE_0 = 'urn:xmpp:jingle:transports:ice:0';
// XEP-0372
exports.NS_REFERENCE_0 = 'urn:xmpp:reference:0';
// XEP-0380
exports.NS_EME_0 = 'urn:xmpp:eme:0';
// XEP-0382
exports.NS_SPOILER_0 = 'urn:xmpp:spoiler:0';
// XEP-0384
exports.NS_OMEMO_AXOLOTL = 'eu.siacs.conversations.axolotl';
exports.NS_OMEMO_AXOLOTL_DEVICELIST = 'eu.siacs.conversations.axolotl.devicelist';
exports.NS_OMEMO_AXOLOTL_BUNDLES = 'eu.siacs.conversations.axolotl.bundles';
// istanbul ignore next
const NS_OMEMO_AXOLOTL_BUNDLE = (deviceId) => `${exports.NS_OMEMO_AXOLOTL_BUNDLES}:${deviceId}`;
exports.NS_OMEMO_AXOLOTL_BUNDLE = NS_OMEMO_AXOLOTL_BUNDLE;
// XEP-0432
exports.NS_JSON_MESSAGE_0 = 'urn:xmpp:json-msg:0';
// ================================================================
// Other Standards
// ================================================================
// Extensible Resource Descriptor (XRD) Version 1.0
// http://docs.oasis-open.org/xri/xrd/v1.0/xrd-1.0.html
exports.NS_XRD = 'http://docs.oasis-open.org/ns/xri/xrd-1.0';
// ====================================================================
// Not yet standardized
// ====================================================================
exports.NS_JINGLE_RTP_MSID_0 = 'urn:xmpp:jingle:apps:rtp:msid:0';
