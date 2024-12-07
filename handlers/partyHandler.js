const { Client: FNclient, Enums } = require('fnbr');

async function initializeFortniteBot(config, webhookClient) {
    const clientOptions = {
        auth: {
            deviceAuth: {
                accountId: process.env.ACCOUNT1_ID,
                deviceId: process.env.ACCOUNT1_DEVICE_ID,
                secret: process.env.ACCOUNT1_SECRET,
            },
        },
        platform: 'WIN',
        partyConfig: {
            chatEnabled: true,
            maxSize: 16,
        },
        debug: console.log,
    };

    const client = new FNclient(clientOptions);

    // Evento: Bot conectado
    client.on('ready', async () => {
        console.log("[FORTNITE] Bot logged in as:", client.user.displayName);
        webhookClient.send(`Fortnite Bot online as: ${client.user.displayName}`);

        // Configurar apariencia inicial
        await client.party.me.setOutfit(config.get('fortnite:cid') || 'CID_001');
        await client.party.me.setBackpack(config.get('fortnite:bid') || 'BID_001');
        await client.party.me.setLevel(config.get('fortnite:level') || 1);
        await client.party.setPrivacy(Enums.PartyPrivacy.PUBLIC);
    });

    // Evento: Invitación a la fiesta
    client.on('party:invite', async (request) => {
        const whitelist = config.get('fortnite:whitelist') || [];
        if (whitelist.includes(request.sender.id)) {
            await request.accept();
            console.log(`[FORTNITE] Invitación aceptada de: ${request.sender.displayName}`);
        } else {
            await request.decline();
            console.log(`[FORTNITE] Invitación rechazada de: ${request.sender.displayName}`);
        }
    });

    // Evento: Miembro se une a la fiesta
    client.on('party:member:joined', (member) => {
        console.log(`[FORTNITE] ${member.displayName} se unió a la fiesta.`);
        webhookClient.send(`${member.displayName} se unió a la fiesta.`);
    });

    // Evento: Miembro sale de la fiesta
    client.on('party:member:left', (member) => {
        console.log(`[FORTNITE] ${member.displayName} salió de la fiesta.`);
        webhookClient.send(`${member.displayName} salió de la fiesta.`);
    });

    // Evento: Mensaje en el chat de la fiesta
    client.on('party:member:message', (msg) => {
        console.log(`[FORTNITE CHAT] ${msg.author.displayName}: ${msg.content}`);
    });

    // Evento: Solicitud de amistad
    client.on('friend:request', async (request) => {
        const autoAdd = config.get('fortnite:add_users') || false;
        if (autoAdd) {
            await request.accept();
            console.log(`[FORTNITE] Amistad aceptada de: ${request.displayName}`);
        } else {
            await request.decline();
            console.log(`[FORTNITE] Amistad rechazada de: ${request.displayName}`);
        }
    });

    // Manejo de errores
    client.on('error', (err) => {
        console.error('[FORTNITE ERROR]', err);
        webhookClient.send(`[ERROR] Fortnite bot encountered an error: ${err.message}`);
    });

    try {
        await client.login();
    } catch (err) {
        console.error('[FORTNITE] Error al iniciar sesión:', err.message);
        webhookClient.send(`[ERROR] No se pudo iniciar sesión: ${err.message}`);
    }
}

module.exports = { initializeFortniteBot };
