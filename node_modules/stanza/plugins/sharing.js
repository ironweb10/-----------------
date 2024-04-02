"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JID = tslib_1.__importStar(require("../JID"));
const Namespaces_1 = require("../Namespaces");
function default_1(client) {
    client.disco.addFeature(Namespaces_1.NS_BOB);
    client.getBits = async (jid, cid) => {
        const result = await client.sendIQ({
            bits: {
                cid
            },
            to: jid,
            type: 'get'
        });
        return result.bits;
    };
    async function getUploadParameters(jid) {
        const disco = await client.getDiscoInfo(jid);
        if (!disco.features || !disco.features.includes(Namespaces_1.NS_HTTP_UPLOAD_0)) {
            return;
        }
        let maxSize;
        for (const form of disco.extensions || []) {
            const fields = form.fields || [];
            if (fields.some(field => field.name === 'FORM_TYPE' && field.value === Namespaces_1.NS_HTTP_UPLOAD_0)) {
                const sizeField = fields.find(field => field.name === 'max-file-size');
                if (sizeField) {
                    maxSize = parseInt(sizeField.value, 10);
                }
                return {
                    jid,
                    maxSize
                };
            }
        }
    }
    client.getUploadService = async (domain = JID.getDomain(client.jid)) => {
        const domainParameters = await getUploadParameters(domain);
        if (domainParameters) {
            return domainParameters;
        }
        const disco = await client.getDiscoItems(domain);
        for (const item of disco.items || []) {
            if (!item.jid) {
                continue;
            }
            const itemParameters = await getUploadParameters(item.jid);
            if (itemParameters) {
                return itemParameters;
            }
        }
        throw new Error('No upload service discovered on: ' + domain);
    };
    client.getUploadSlot = async (uploadService, uploadRequest) => {
        const resp = await client.sendIQ({
            httpUpload: {
                type: 'request',
                ...uploadRequest
            },
            to: uploadService,
            type: 'get'
        });
        return resp.httpUpload;
    };
}
exports.default = default_1;
