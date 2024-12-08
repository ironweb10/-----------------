const { WebhookClient } = require('discord.js');
const nconf = require('nconf');
const { send_webhook } = require('./../structs/config');
class WebhookClientWrapper {
    constructor() {
        this.webhookEnabled = (send_webhook);
        const url = process.env.DISCORD_WEBHOOK_URL;

        if (this.webhookEnabled) {
            if (!url) {
                console.error('[DISCORD] Webhook URL is not defined.');
                this.webhookEnabled = false;
            } else {
                console.log('[DISCORD] Webhook is enabled');
                this.webhookClient = new WebhookClient({ url });
            }
        } else {
            console.log('[DISCORD] Webhook is disabled');
        }
    }

    send(message) {
        if (this.webhookEnabled && this.webhookClient) {
            return this.webhookClient.send(message)
                .catch(err => console.error('Error sending webhook:', err));
        } else {
            
        }
    }
}

module.exports = WebhookClientWrapper; 
