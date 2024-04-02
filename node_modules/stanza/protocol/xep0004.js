"use strict";
// ====================================================================
// XEP-0004: Data Forms
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0004.html
// Version: 2.9 (2007-08-13)
//
// Additional:
// --------------------------------------------------------------------
// XEP-0122: Data Forms Validation
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0122.html
// Version: 1.0.1 (2018-03-05)
// ====================================================================
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Constants");
const jxt_1 = require("../jxt");
const Namespaces_1 = require("../Namespaces");
const Protocol = [
    {
        aliases: [{ path: 'message.forms', multiple: true }],
        element: 'x',
        fields: {
            instructions: {
                ...jxt_1.multipleChildText(null, 'instructions'),
                exportOrder: 2
            },
            reported: {
                ...jxt_1.splicePath(null, 'reported', 'dataformField', true),
                exportOrder: 3
            },
            title: {
                ...jxt_1.childText(null, 'title'),
                exportOrder: 1
            },
            type: jxt_1.attribute('type')
        },
        namespace: Namespaces_1.NS_DATAFORM,
        optionalNamespaces: {
            xdv: Namespaces_1.NS_DATAFORM_VALIDATION
        },
        path: 'dataform'
    },
    {
        aliases: [
            { path: 'dataform.fields', multiple: true },
            { path: 'dataform.items.fields', multiple: true }
        ],
        element: 'field',
        fields: {
            description: jxt_1.childText(null, 'desc'),
            label: jxt_1.attribute('label'),
            name: jxt_1.attribute('var'),
            rawValues: {
                ...jxt_1.multipleChildText(null, 'value'),
                exporter: () => null
            },
            required: jxt_1.childBoolean(null, 'required'),
            type: jxt_1.attribute('type'),
            value: {
                importer(xml, context) {
                    const fieldType = xml.getAttribute('type');
                    const converter = jxt_1.multipleChildText(Namespaces_1.NS_DATAFORM, 'value');
                    const rawValues = converter.importer(xml, context);
                    const singleValue = rawValues[0];
                    switch (fieldType) {
                        case Constants_1.DataFormFieldType.TextMultiple:
                        case Constants_1.DataFormFieldType.ListMultiple:
                        case Constants_1.DataFormFieldType.JIDMultiple:
                            return rawValues;
                        case Constants_1.DataFormFieldType.Hidden:
                        case Constants_1.DataFormFieldType.Fixed:
                            if (rawValues.length === 1) {
                                return singleValue;
                            }
                            return rawValues;
                        case Constants_1.DataFormFieldType.Boolean:
                            if (singleValue) {
                                return singleValue === '1' || singleValue === 'true';
                            }
                            break;
                        default:
                            return singleValue;
                    }
                },
                exporter(xml, data, context) {
                    const converter = jxt_1.multipleChildText(null, 'value');
                    let outputData = [];
                    const rawData = context.data && context.data.rawValues
                        ? context.data.rawValues[0]
                        : undefined;
                    if (typeof data === 'boolean') {
                        if (rawData === 'true' || rawData === 'false') {
                            outputData = [rawData];
                        }
                        else {
                            outputData = [data ? '1' : '0'];
                        }
                    }
                    else if (!Array.isArray(data)) {
                        outputData = [data.toString()];
                    }
                    else {
                        for (const value of data) {
                            outputData.push(value.toString());
                        }
                    }
                    converter.exporter(xml, outputData, Object.assign({}, context, {
                        namespace: Namespaces_1.NS_DATAFORM
                    }));
                }
            }
        },
        namespace: Namespaces_1.NS_DATAFORM,
        path: 'dataformField'
    },
    {
        aliases: [{ path: 'dataform.fields.options', multiple: true }],
        element: 'option',
        fields: {
            label: jxt_1.attribute('label'),
            value: jxt_1.childText(null, 'value')
        },
        namespace: Namespaces_1.NS_DATAFORM
    },
    {
        aliases: [{ path: 'dataform.items', multiple: true }],
        element: 'item',
        namespace: Namespaces_1.NS_DATAFORM
    },
    // ----------------------------------------------------------------
    // XEP-0122: Data Forms Validation
    // ----------------------------------------------------------------
    {
        element: 'validate',
        fields: {
            listMax: jxt_1.childIntegerAttribute(null, 'list-range', 'max'),
            listMin: jxt_1.childIntegerAttribute(null, 'list-range', 'min'),
            method: jxt_1.childEnum(null, ['basic', 'open', 'range', 'regex'], 'basic'),
            rangeMax: jxt_1.childAttribute(null, 'range', 'max'),
            rangeMin: jxt_1.childAttribute(null, 'range', 'min'),
            regex: jxt_1.childText(null, 'regex'),
            type: jxt_1.attribute('datatype', 'xs:string')
        },
        namespace: Namespaces_1.NS_DATAFORM_VALIDATION,
        path: 'dataform.fields.validation'
    }
];
exports.default = Protocol;
