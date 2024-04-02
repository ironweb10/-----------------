"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(client) {
    client.registerFeature('sasl', 100, async (features, done) => {
        const mech = client.sasl.createMechanism(features.sasl.mechanisms);
        const saslHandler = async (sasl) => {
            if (!mech) {
                return;
            }
            switch (sasl.type) {
                case 'success': {
                    client.features.negotiated.sasl = true;
                    client.off('sasl', saslHandler);
                    client.emit('auth:success', client.config.credentials);
                    if (client.transport) {
                        client.transport.authenticated = true;
                    }
                    done('restart');
                    return;
                }
                case 'challenge': {
                    mech.processChallenge(sasl.value);
                    try {
                        const credentials = (await client.getCredentials());
                        const resp = mech.createResponse(credentials);
                        if (resp || resp === '') {
                            client.send('sasl', {
                                type: 'response',
                                value: resp
                            });
                        }
                        else {
                            client.send('sasl', {
                                type: 'response'
                            });
                        }
                        const cacheable = mech.getCacheableCredentials();
                        if (cacheable) {
                            if (!client.config.credentials) {
                                client.config.credentials = {};
                            }
                            client.config.credentials = {
                                ...client.config.credentials,
                                ...cacheable
                            };
                            client.emit('credentials:update', client.config.credentials);
                        }
                    }
                    catch (err) {
                        console.error(err);
                        client.send('sasl', {
                            type: 'abort'
                        });
                    }
                    return;
                }
                case 'failure':
                case 'abort': {
                    client.off('sasl', saslHandler);
                    client.emit('auth:failed');
                    done('disconnect', 'authentication failed');
                    return;
                }
            }
        };
        if (!mech) {
            client.off('sasl', saslHandler);
            client.emit('auth:failed');
            return done('disconnect', 'authentication failed');
        }
        client.on('sasl', saslHandler);
        client.once('--reset-stream-features', () => {
            client.features.negotiated.sasl = false;
            client.off('sasl', saslHandler);
        });
        try {
            const credentials = (await client.getCredentials());
            client.send('sasl', {
                mechanism: mech.name,
                type: 'auth',
                value: mech.createResponse(credentials)
            });
        }
        catch (err) {
            console.error(err);
            client.send('sasl', {
                type: 'abort'
            });
        }
    });
}
exports.default = default_1;
