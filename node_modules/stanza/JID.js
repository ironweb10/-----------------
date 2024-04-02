"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toURI = exports.parseURI = exports.toBare = exports.getResource = exports.getDomain = exports.getLocal = exports.isBare = exports.isFull = exports.equalBare = exports.equal = exports.allowedResponders = exports.parse = exports.createFull = exports.create = exports.prepare = exports.unescapeLocal = exports.escapeLocal = void 0;
const tslib_1 = require("tslib");
const punycode_1 = tslib_1.__importDefault(require("punycode"));
const stringprep_1 = require("./lib/stringprep");
function escapeLocal(val = '') {
    return val
        .replace(/^\s+|\s+$/g, '')
        .replace(/\\5c/g, '\\5c5c')
        .replace(/\\20/g, '\\5c20')
        .replace(/\\22/g, '\\5c22')
        .replace(/\\26/g, '\\5c26')
        .replace(/\\27/g, '\\5c27')
        .replace(/\\2f/g, '\\5c2f')
        .replace(/\\3a/g, '\\5c3a')
        .replace(/\\3c/g, '\\5c3c')
        .replace(/\\3e/g, '\\5c3e')
        .replace(/\\40/g, '\\5c40')
        .replace(/ /g, '\\20')
        .replace(/"/g, '\\22')
        .replace(/&/g, '\\26')
        .replace(/'/g, '\\27')
        .replace(/\//g, '\\2f')
        .replace(/:/g, '\\3a')
        .replace(/</g, '\\3c')
        .replace(/>/g, '\\3e')
        .replace(/@/g, '\\40');
}
exports.escapeLocal = escapeLocal;
function unescapeLocal(val) {
    return val
        .replace(/\\20/g, ' ')
        .replace(/\\22/g, '"')
        .replace(/\\26/g, '&')
        .replace(/\\27/g, `'`)
        .replace(/\\2f/g, '/')
        .replace(/\\3a/g, ':')
        .replace(/\\3c/g, '<')
        .replace(/\\3e/g, '>')
        .replace(/\\40/g, '@')
        .replace(/\\5c/g, '\\');
}
exports.unescapeLocal = unescapeLocal;
function prepare(data) {
    let local = data.local || '';
    let domain = data.domain;
    let resource = data.resource || '';
    if (local) {
        local = stringprep_1.nodeprep(local);
    }
    if (resource) {
        resource = stringprep_1.resourceprep(resource);
    }
    if (domain[domain.length - 1] === '.') {
        domain = domain.slice(0, domain.length - 1);
    }
    domain = stringprep_1.nameprep(domain.split('.').map(punycode_1.default.toUnicode).join('.'));
    return {
        domain,
        local,
        resource
    };
}
exports.prepare = prepare;
function create(data, opts = {}) {
    let localPart = data.local;
    if (!opts.escaped) {
        localPart = escapeLocal(data.local);
    }
    const prep = !opts.prepared
        ? prepare({ local: localPart, domain: data.domain, resource: data.resource })
        : data;
    const bareJID = localPart ? `${localPart}@${prep.domain}` : prep.domain;
    if (prep.resource) {
        return `${bareJID}/${prep.resource}`;
    }
    return bareJID;
}
exports.create = create;
function createFull(bare, resource) {
    if (resource) {
        return `${toBare(bare)}/${resource}`;
    }
    else {
        return toBare(bare);
    }
}
exports.createFull = createFull;
function parse(jid = '') {
    let local = '';
    let domain = '';
    let resource = '';
    const resourceStart = jid.indexOf('/');
    if (resourceStart > 0) {
        resource = jid.slice(resourceStart + 1);
        jid = jid.slice(0, resourceStart);
    }
    const localEnd = jid.indexOf('@');
    if (localEnd > 0) {
        local = jid.slice(0, localEnd);
        jid = jid.slice(localEnd + 1);
    }
    domain = jid;
    const prepped = prepare({
        domain,
        local,
        resource
    });
    return {
        bare: create({ local: prepped.local, domain: prepped.domain }, {
            escaped: true,
            prepared: true
        }),
        domain: prepped.domain,
        full: create(prepped, {
            escaped: true,
            prepared: true
        }),
        local: unescapeLocal(prepped.local),
        resource: prepped.resource
    };
}
exports.parse = parse;
function allowedResponders(jid1, jid2) {
    const allowed = new Set();
    allowed.add(undefined);
    allowed.add('');
    if (jid1) {
        const split1 = parse(jid1);
        allowed.add(split1.full);
        allowed.add(split1.bare);
        allowed.add(split1.domain);
    }
    if (jid2) {
        const split2 = parse(jid2);
        allowed.add(split2.domain);
        allowed.add(split2.bare);
        allowed.add(split2.full);
    }
    return allowed;
}
exports.allowedResponders = allowedResponders;
function equal(jid1, jid2) {
    if (!jid1 || !jid2) {
        return false;
    }
    const parsed1 = parse(jid1);
    const parsed2 = parse(jid2);
    return (parsed1.local === parsed2.local &&
        parsed1.domain === parsed2.domain &&
        parsed1.resource === parsed2.resource);
}
exports.equal = equal;
function equalBare(jid1, jid2) {
    if (!jid1 || !jid2) {
        return false;
    }
    const parsed1 = parse(jid1);
    const parsed2 = parse(jid2);
    return parsed1.local === parsed2.local && parsed1.domain === parsed2.domain;
}
exports.equalBare = equalBare;
function isFull(jid) {
    const parsed = parse(jid);
    return !!parsed.resource;
}
exports.isFull = isFull;
function isBare(jid) {
    return !isFull(jid);
}
exports.isBare = isBare;
function getLocal(jid = '') {
    return parse(jid).local;
}
exports.getLocal = getLocal;
function getDomain(jid = '') {
    return parse(jid).domain;
}
exports.getDomain = getDomain;
function getResource(jid = '') {
    return parse(jid).resource;
}
exports.getResource = getResource;
function toBare(jid = '') {
    return parse(jid).bare;
}
exports.toBare = toBare;
function parseURI(val) {
    const parsed = new URL(val);
    if (parsed.protocol !== 'xmpp:') {
        throw new Error('Invalid XMPP URI, wrong protocol: ' + parsed.protocol);
    }
    const identity = parsed.hostname
        ? parsed.username
            ? create({
                domain: decodeURIComponent(parsed.hostname),
                local: decodeURIComponent(parsed.username)
            }, {
                escaped: true
            })
            : decodeURIComponent(parsed.hostname)
        : undefined;
    const jid = parse(decodeURIComponent(identity ? parsed.pathname.substr(1) : parsed.pathname))
        .full;
    const hasParameters = parsed.search && parsed.search.indexOf(';') >= 1;
    const parameterString = hasParameters
        ? parsed.search.substr(parsed.search.indexOf(';') + 1)
        : '';
    const action = parsed.search
        ? decodeURIComponent(parsed.search.substr(1, hasParameters ? parsed.search.indexOf(';') - 1 : undefined))
        : undefined;
    const params = {};
    for (const token of parameterString.split(';')) {
        const [name, value] = token.split('=').map(decodeURIComponent);
        if (!params[name]) {
            params[name] = value;
        }
        else {
            const existing = params[name];
            if (Array.isArray(existing)) {
                existing.push(value);
            }
            else {
                params[name] = [existing, value];
            }
        }
    }
    return {
        action,
        identity,
        jid,
        parameters: params
    };
}
exports.parseURI = parseURI;
function toURI(data) {
    const parts = ['xmpp:'];
    const pushJID = (jid, allowResource) => {
        const res = parse(jid);
        if (res.local) {
            parts.push(encodeURIComponent(escapeLocal(res.local)));
            parts.push('@');
        }
        parts.push(encodeURIComponent(res.domain));
        if (allowResource && res.resource) {
            parts.push('/');
            parts.push(encodeURIComponent(res.resource));
        }
    };
    if (data.identity) {
        parts.push('//');
        pushJID(data.identity, false);
        if (data.jid) {
            parts.push('/');
        }
    }
    if (data.jid) {
        pushJID(data.jid, true);
    }
    if (data.action) {
        parts.push('?');
        parts.push(encodeURIComponent(data.action));
    }
    for (const [name, values] of Object.entries(data.parameters || {})) {
        for (const val of Array.isArray(values) ? values : [values]) {
            parts.push(';');
            parts.push(encodeURIComponent(name));
            if (val !== undefined) {
                parts.push('=');
                parts.push(encodeURIComponent(val));
            }
        }
    }
    return parts.join('');
}
exports.toURI = toURI;
