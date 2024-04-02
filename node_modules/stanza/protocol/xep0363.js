"use strict";
// ====================================================================
// XEP-0363: HTTP File Upload
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0363.html
// Version: 0.5.0 (2018-02-15)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    jxt_1.extendStanzaError({
        httpUploadError: jxt_1.childEnum(Namespaces_1.NS_HTTP_UPLOAD_0, ['file-too-large', 'retry']),
        httpUploadMaxFileSize: jxt_1.deepChildInteger([
            { namespace: Namespaces_1.NS_HTTP_UPLOAD_0, element: 'file-too-large' },
            { namespace: Namespaces_1.NS_HTTP_UPLOAD_0, element: 'max-file-size' }
        ]),
        httpUploadRetry: jxt_1.childDateAttribute(Namespaces_1.NS_HTTP_UPLOAD_0, 'retry', 'stamp')
    }),
    {
        element: 'request',
        fields: {
            mediaType: jxt_1.attribute('content-type'),
            name: jxt_1.attribute('filename'),
            size: jxt_1.integerAttribute('size')
        },
        namespace: Namespaces_1.NS_HTTP_UPLOAD_0,
        path: 'iq.httpUpload',
        type: 'request',
        typeField: 'type'
    },
    {
        element: 'slot',
        fields: {
            download: jxt_1.childAttribute(null, 'get', 'url')
        },
        namespace: Namespaces_1.NS_HTTP_UPLOAD_0,
        path: 'iq.httpUpload',
        type: 'slot'
    },
    {
        aliases: [{ path: 'iq.httpUpload.upload', selector: 'slot' }],
        element: 'put',
        fields: {
            url: jxt_1.attribute('url')
        },
        namespace: Namespaces_1.NS_HTTP_UPLOAD_0
    },
    {
        aliases: [{ path: 'iq.httpUpload.upload.headers', multiple: true }],
        element: 'header',
        fields: {
            name: jxt_1.attribute('name'),
            value: jxt_1.text()
        },
        namespace: Namespaces_1.NS_HTTP_UPLOAD_0
    }
];
exports.default = Protocol;
