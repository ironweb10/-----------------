const nconf = require('nconf')
const config = nconf.argv().env().file({ file: 'config.json' })
const { Client: FNclient, ClientOptions, Enums, Party } = require('fnbr');
const clientOptions = {
    defaultStatus: "Launching",
    auth: {},
    debug: console.log,
    xmppDebug: false,
    platform: 'WIN',
    partyConfig: {
      chatEnabled: true,
      maxSize: 16
    }
  };
const client = new FNclient(clientOptions);
party = client.party

const Discord = require("discord.js")
const cid = nconf.get('fortnite:cid')
const bid = nconf.get('fortnite:bid')
const eid = nconf.get('fortnite:eid')
const level = nconf.get('fortnite:level')
const banner = nconf.get('fortnite:banner')
const bannerColor = nconf.get('fortnite:banner_color')
const discord_status = nconf.get('discord:status')
const discord_status_type = nconf.get('discord:status_type')
const discord_commands_guild = nconf.get('discord:command_guild')
const web_message = nconf.get('system:web_message')
const DISCORD_TOKEN = process.env['DISCORD_TOKEN'] 
const discord_command_status_message = nconf.get("discord:guild_slash_status_response")
const bot_loading_message = nconf.get('system:bot_loading_message')
const bot_use_status = nconf.get('fortnite:inuse_status')
const bot_use_onlinetype = nconf.get('fortnite:inuse_onlinetype')
const bot_invite_status = nconf.get('fortnite:invite_status')
const bot_invite_onlinetype = nconf.get('fortnite:invite_onlinetype')
const bot_join_message = nconf.get('fortnite:join_message')
const bot_leave_time = nconf.get('fortnite:leave_time')
const addusers = nconf.get('fortnite:add_users')
const run_discord_client = nconf.get('discord:run_discord_client')
const discord_crash_command = nconf.get('discord:disable_crash_command')
const webhookClient = new Discord.WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });
const crypto = require('crypto');
const express = require("express");
const app = express()
const discord = require("discord.js")
const { Client: Dclient, Message, MessageEmbed, Collection } = require("discord.js");
const dclient = new Dclient({intents: ["GUILDS", "GUILD_MESSAGES"]});
dclient.once('ready', () => {
  console.log("[DISCORD] client is online!")
  dclient.user.setActivity(discord_status, {type: discord_status_type})
  const guildId = discord_commands_guild
  const guild = dclient.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = dclient.application?.commands
  }

  commands?.create({
    name: "status",
    description: "just SENDS the STATUS!",
  })
commands?.create({
  name: 'add',
  description: 'adds a user',
  options: [
    {
      name: "user",
      description: 'user 2 add',
      required: true,
      type: discord.Constants.ApplicationCommandOptionTypes.STRING
    }
  ]
})
  commands?.create({
    name: 'unadd',
    description: "user to unadd",
    options: [
      {
        name: 'usertounadd',
        description: "user to unadd",
        type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'playlist',
    description: 'sets the current playlist if the bot is party leader',
    options: [
      {
        name: 'playlist',
        description: 'sets the party playlist',
        type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'stoptimer',
    description: 'stops the setTimeout function aka the party timer'
  })
  commands?.create({
    name: 'setemote',
    description: 'sets the clients emote with an id',
    options: [
      {
        name: 'emoteid',
        description: 'Id of the emote',
        required: true,
        type: discord.Constants.ApplicationCommandOptionTypes.STRING 
      }
    ]
  })
  commands?.create({
    name: 'setoutfit',
    description: 'sets an outfit with an id',
    options: [
      {
        name: 'skinid',
        description: 'id of the skin',
        type: discord.Constants.ApplicationCommandOptionTypes.STRING    
      }
    ]
  })
  commands?.create({
    name: "restartfnclient",
    description: "restart"
  })
  commands?.create({
    name: 'restartall',
    description: 'restarts all clients'
  })
 commands?.create({
   name: 'leaveparty',
   description: "leaves the current party"
 })
  commands?.create({
    name: 'sendpartychatmessage',
    description: "sends a message to the fortnite party chat!",
    options: [
      {
        name: 'message',
        description: 'the message to send!',
        type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'level',
    description: 'sets the clients level',
    options: [
      {
        name: 'level',
        description: 'the level to set',
        type: discord.Constants.ApplicationCommandOptionTypes.NUMBER,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'sitout',
    description: 'sets the siting out state',
    options: [
      {
        name: 'sitingout',
        description: 'sets the sitingout state',
        required: true,
       
        type: discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
      }
    ]
  })
  commands?.create({
    name: 'readystate',
    description: 'sets the bots ready state',
    options: [
      {
        name: 'state',
        description: 'the state of the ready option',
        required: true,
        type: discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
      }
    ]
  })
  commands?.create({
    name: 'crash',
    description: 'crashes the current party the client is in'
  })
  commands?.create({
    name: "enablecrowns",
    description: "Bot must be party leader"
  })
});


app.get('/', (req, res) => {
  res.send(web_message)
})
 
app.listen(3000, () => {
  console.log(bot_loading_message)
})

const url = require('url')
const fs = require('fs');
const axios = require('axios').default;
var os = require('os');
const Websocket = require('ws');
var HttpsProxyAgent = require('https-proxy-agent');
const { allowedPlaylists, websocketHeaders } = require('./utils/constants');
const xmlparser = require('xml-parser');
require('colors');

const bLog = true;
const GetVersion = require('./utils/version');



(async () => {
  const lastest = await GetVersion();
  const Platform = os.platform() === "win32" ? "Windows" : os.platform();
  const UserAgent = `Fortnite/${lastest.replace('-Windows', '')} ${Platform}/${os.release()}`

  axios.defaults.headers["user-agent"] = UserAgent;
  console.log("UserAgent set to", axios.defaults.headers["user-agent"]);

  
  const deviceauths = {
  "accountId": process.env['accountId'],
  "deviceId": process.env['deviceId'],
  "secret": process.env['secret'] 
  }
  try {
    clientOptions.auth.deviceAuth = deviceauths;
  } catch (e) {
    clientOptions.auth.authorizationCode = async () => Client.consoleQuestion('Please enter an authorization code: ');
  }

  const client = new FNclient(clientOptions);


  await client.login();
  console.log(`[LOGS] Logged in as ${client.user.displayName}`);
  party = client.party
  const fnbrclient = client
  client.setStatus(bot_invite_status, bot_invite_onlinetype)
  await client.party.me.setOutfit(cid);
  await client.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
  await client.party.me.setLevel(level)
  await client.party.me.setBanner(banner, bannerColor)
  await client.party.me.setBackpack(bid)
  
  
  dclient.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const  { commandName, options } = interaction

  if (commandName === 'status') {
    interaction.reply({
      content: discord_command_status_message,
    })
  } else if (commandName === 'add') {
    const user = options.getString('user') || null
    if (user === null) {
      interaction.reply({
        content: 'No user provided!'
      })
    } else {
      fnbrclient.addFriend(user)
      interaction.reply({
        content: `${user} has been sent a friend request`
      })
    }
  } else if (commandName === 'unadd') {
    const unadduser = options.getString('usertounadd')
    fnbrclient.removeFriend(unadduser)
    interaction.reply({
      content: `${unadduser} has been unadded!`
    })
  } else if (commandName === 'playlist') {
    const setplaylist = options.getString('playlist')
    fnbrclient.party.setPlaylist({ playlistName: setplaylist })
      interaction.reply({
      content: `Playlist Id: ${setplaylist} has been set as the playlist!`
    })
  } else if (commandName === 'stoptimer') {
    if (timerstatus == true) {
        timerstatus = false
        let id = this.ID
        console.log(`[PARTY] timer id: ${id}`)
        clearTimeout(id)
        console.log("[PARTY] Time has stoped!")
        interaction.reply({
          content: `TimerID: ${id} has now been stoped!`
        })
    } else {
      interaction.reply({
        content: 'Timer is not running!'
      })
    }
  } else if (commandName === 'setemote') {
    const emoteid = options.getString('emoteid')
    fnbrclient.party.me.setEmote(emoteid)
    interaction.reply({
      content: `Id: ${emoteid} has been set as the emote!`
    })
  }  else if (commandName === 'setoutft') {
    const skinid = options.getString('skinid')
    interaction.reply({
      content: `This FNBRclient command is disabled!`
    })
  } else if (commandName === 'restartfnclient') {
  
    fnbrclient.restart()
    interaction.reply({
      content: "FN client is restarting!"
    })
  } else if (commandName === 'restartall') {
    interaction.reply({
      content: "All clients are currently being killed!"
    })
    function killbot() {
      process.exit(1)
    }
    setTimeout(killbot, 1000)
  } else if (commandName === 'leaveparty') {
    fnbrclient.party.leave()
    interaction.reply({
      content: "left the current party!"
    })
  } else if (commandName === 'sendpartychatmessage') {
    const message = options.getString('message')
    fnbrclient.party.chat.send(message)
    interaction.reply({
      content: `Message: ${message} has been sent in the party chat!`,
    })
  } else if (commandName === 'level') {
    const leveltoset = options.getNumber('level')
    fnbrclient.party.me.setLevel(parseInt(leveltoset, 10));
    interaction.reply({
      content: `level was set to ${leveltoset}`
    })
  } else if (commandName === 'sitout') {
    
    const sitvalue = options.getBoolean('sitingout')
    if (sitvalue === true) {
      client.party.me.setSittingOut(true)
      interaction.reply({
        content: `Siting out state set to ${sitvalue}`
      })
    } else if (sitvalue === false){
      client.party.me.setSittingOut(false)
      interaction.reply({
        content: `Siting out state set to ${sitvalue}`
      })
    }
  } else if (commandName === 'readystate') {

    const readystate = options.getBoolean('state')
    if (readystate === true) {
      client.party.me.setReadiness(true)
      interaction.reply({
        content: 'I am now ready'
      })
    } else if (readystate === false) {
      client.party.me.setReadiness(false)
      interaction.reply({
        content: 'I am now unready'
      })
    }
  } else if (commandName === 'crash') {
    if (interaction.user.id === 382930404249698304) {
      interaction.reply({
        content: 'Error: commandName is not a valid function.'
      })
    } else {
     if (discord_crash_command === false) {
     client.party.me.setEmote('/setemote emoteid:eid_floss')
     fnbrclient.party.leave()
      console.log("Left party")
    interaction.reply({
      content: 'party was crashed'
    })
  } else {
       interaction.reply({
         content: "Command is disabled by the owner!"
       })
  }
    }
  } else if (commandName === 'enablecrowns'){
     try {
       fnbrclient.party.setPlaylist({ playlistName: "playlist_bots_nobuildbr_duo" })
       fnbrclient.party.chat.send("A user has enabled Crowns meaning the lobbys might be harder!")
       function crownleaveparty() {
         fnbrclient.party.leave()
       }
       setTimeout(crownleaveparty, 2000)
       interaction.reply({
         content: "Enabled crowns \nREMINDER:\nThese lobbys will be harder."
       })
     } catch (error) {
       console.log(error)
       interaction.reply({
         content: error
       })
     }
  } else {
    return
  }
});
  
  axios.interceptors.response.use(undefined, function (error) {
    if (error.response) {

      if (error.response.data.errorCode && client && client.party) {
        client.party.sendMessage(`HTTP Error: ${error.response.status} ${error.response.data.errorCode} ${error.response.data.errorMessage}`)
      }

      console.error(error.response.status, error.response.data)
    }

    return error;
  });


 var bIsMatchmaking = false;

    client.on('party:updated', async (updated) => {

      switch (updated.meta.schema["Default:PartyState_s"]) {
        case "BattleRoyalePreloading": {

          var loadout = client.party.me.meta.set("Default:LobbyState_j",
            {
              "LobbyState": {
                "hasPreloadedAthena": true
              }
            }
          );

          await client.party.me.sendPatch({
            'Default:LobbyState_j': loadout,
          });

          break;
        }

        case "BattleRoyaleMatchmaking": {
          if (bIsMatchmaking) {
            webhookClient.send(`
\`\`\`fix
Le bot Iron mm Et les membres ont commencé à lancer le matchmaking! \`\`\``)
            return;
          }
          bIsMatchmaking = true;
          if (bLog) {
            webhookClient.send(`
\`\`\`fix
Iron mm [${'Matchmaking'}], 'Matchmaking Started' \`\`\``)
          }

          /**
           * @type {PartyMatchmakingInfo}
           */
          const PartyMatchmakingInfo = JSON.parse(updated.meta.schema["Default:PartyMatchmakingInfo_j"]).PartyMatchmakingInfo;


          const playlistId = PartyMatchmakingInfo.playlistName.toLocaleLowerCase();



          if (!allowedPlaylists.includes(playlistId)) {
            webhookClient.send(`
\`\`\`diff
- Unsupported playlist, ${playlistId}\`\`\``)
            client.party.chat.send(`Playlist id: ${playlistId} is not a supported gamemode!`)

            client.party.me.setReadiness(false);
            client.party.members.map(async (player) => {
              if (player.id === client.user.self.id) return;
              client.friend.remove(player.displayName).catch((err) => { console.log("Impossible d'enlever l'ami : " + player.displayName) })
            })
            bIsMatchmaking = false;
            client.party.leave()
            return;
          }

          var partyPlayerIds = client.party.members.filter(x => x.isReady).map(x => x.id).join(',')

          const bucketId = `${PartyMatchmakingInfo.buildId}:${PartyMatchmakingInfo.playlistRevision}:${PartyMatchmakingInfo.regionId}:${playlistId}`
          webhookClient.send(`${bucketId}`)



          // auth.missing_player_id

          webhookClient.send(`${partyPlayerIds}`)

          var query = new URLSearchParams();
          query.append("partyPlayerIds", partyPlayerIds);
          query.append("player.platform", "Windows");
          query.append("player.option.partyId", client.party.id);
          query.append("input.KBM", "true");
          query.append("player.input", "KBM");
          query.append("bucketId", bucketId);

          client.party.members.filter(x => x.isReady).forEach(Member => {
            const platform = Member.meta.get("Default:PlatformData_j");
            if (!query.has(`party.{PlatformName}`)) {
              query.append(`party.{PlatformName}`, "true")
            }
          });

          console.log(client.auth.auths.get("fortnite"))
          const token = client.auth.auths.get("fortnite").token
            const accid = client.auth.auths.get("fortnite").account_id
          //const token = client.auth.auths.get("fortnite").token;


        const TicketRequest = (
          await axios.get(
            `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/matchmakingservice/ticket/player/${accid}?${query}`,
            {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
            )
          );

          console.log("TICKET REQUEST: " + TicketRequest)

        if (TicketRequest.status !== 200) {
            webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}], Error while obtaining ticket\`\`\``);
            client.party.me.setReadiness(false);
            return console.log(TicketRequest);
          }

          /**
           * @type {MMSTicket}
           */
          const ticket = TicketRequest.data;

          /**
           * @type {String}
           */
          const HashRequest = (
            await axios.post(
              // "https://plebs.polynite.net/api/checksum",
              "https://api.waferbot.com/checksum",
              ticket,
              {
                Accept: 'application/json'
              }
            )
          );

          if (TicketRequest.status !== 200) {
            webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}], Erreur lors de l’obtention du hash\`\`\``);
            client.party.me.setReadiness(false);
            return;
          }


          //const calculatedchecksum = calcChecksum(ticket.payload, ticket.signature);
          const calculatedchecksum = HashRequest.data;

          var MMSAuth = [
            "Epic-Signed",
            ticket.ticketType,
            ticket.payload,
            ticket.signature,
            calculatedchecksum
          ];

          const matchmakingClient = new Websocket(
            ticket.serviceUrl,
            {
              perMessageDeflate: false,
              rejectUnauthorized: false,
              headers: {
                Origin: ticket.serviceUrl.replace('ws', 'http'),
                Authorization: MMSAuth.join(" "),
                ...websocketHeaders
              }
            }
          );


matchmakingClient.on('unexpected-response', (request, response) => {
            let data = '';
            response.on('data', (chunk) => data += chunk);

            response.on('end', () => {
              const baseMessage = `[MATCHMAKING] Erreur lors de la connexion au service de mise en relation: (status ${response.statusCode} ${response.statusMessage})`;

              client.party.chat.send(`Erreur lors de la connexion au service de mise en relation: (status ${response.statusCode} ${response.statusMessage})`)

              if (data == '') {
                console.error(baseMessage);

              }

              else if (response.headers['content-type'].startsWith('application/json')) {

                const jsonData = JSON.parse(data);

                if (jsonData.errorCode) {

                  console.error(`${baseMessage}, ${jsonData.errorCode} ${jsonData.errorMessage || ''}`);
                  client.party.chat.send(`Error while connecting to matchmaking service: ${jsonData.errorCode} ${jsonData.errorMessage || ''}`)

                } else {
                  console.error(`${baseMessage} response body: ${data}`)
                }

              }

              else if (response.headers['x-epic-error-name']) {

                console.error(`${baseMessage}, ${response.headers['x-epic-error-name']} response body: ${data}`);

              }

              else if (response.headers['content-type'].startsWith('text/html')) {
                const parsed = xmlparser(data);

                if (parsed.root) {

                  try {

                    const title = parsed.root.children.find(x => x.name == 'head').children.find(x => x.name == 'title');

                    console.error(`${baseMessage} HTML title: ${title}`)

                  } catch { console.error(`${baseMessage} HTML response body: ${data}`) }

                }

                else { console.error(`${baseMessage} HTML response body: ${data}`) }
              }

              else { console.error(`${baseMessage} response body: ${data}`) }
            })
          })

          if (bLog) {
            matchmakingClient.on('close', function () {
              webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}], Connexion au matchmaking fermée\`\`\``)

            });
          }

          matchmakingClient.on('message', (msg) => {
            const message = JSON.parse(msg);
            if (bLog) {
              webhookClient.send(`[${'Matchmaking'}]`, 'Message du matchmaker', `[${message}]`)
            }

            if (message.name === 'Error') {
              bIsMatchmaking = false;
            }
          });

          break;
        }

        case "BattleRoyalePostMatchmaking": {
          if (bLog) {
            webhookClient.send(`
\`\`\`fix
[${'Party'}], Les joueurs sont entrés dans l’écran de chargement avec le Bot**Iron mm**, Je quitte le groupe dans 5sec...\`\`\``)
          }

          if (client.party?.me?.isReady) {
            client.party.me.setReadiness(false)
          }
          bIsMatchmaking = false;
          client.party.members.map(async (player) => {
            if (player.id === client.user.self.id) return;
            client.friend.remove(player.displayName).catch((err) => { console.log("Impossible d'enlever l'ami : " + player.displayName) })
          })

          if (leave_after) {
            client.party.leave();
            break;
          } else {
            if (!leave_after) {
              async function timeexpire() {
                client.party.chat.send("Time expired!")
                await sleep(1.2)
                client.party.leave()
                webhookClient.send("[PARTY] Je quitte la partie pour la raison **Trop temp pour lancer une game c'est casse couille quoi**!")
                webhookClient.send("[PARTY] Le suivi du temps s’est arrêté!")
                timerstatus = false
              }
              this.ID = setTimeout(timeexpire, 3600000)
              break;
            }
          }
          await client.party.setPrivacy(Enums.PartyPrivacy.PUBLIC);
        }

        case "BattleRoyaleView": {
          break;
        }

        default: {
          if (bLog) { webhookClient.send(`[${'Party'}]`, 'Unknow PartyState', `${updated.meta.schema["Default:PartyState_s"]}`) }
          break;
        }
      }
    })

          
       
  const findCosmetic = (query, type) => {
    return cosmetics.find((c) => (c.id.toLowerCase() === query.toLowerCase()
      || c.name.toLowerCase() === query.toLowerCase()) && c.type.value === type);
  };

  const handleCommand = (message, sender) => {
    console.log(`${sender.displayName}: ${message.content}`);
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();
    const content = args.join(' ');

    if (command === 'dev:set:skin') {
      const skin = findCosmetic(content, 'outfit');
      if (skin) client.party.me.setOutfit(skin.id);
      else message.reply(`Skin ${content} wasn't found!`);
    } else if (command === 'dev:set:emote') {
      const emote = findCosmetic(content, 'emote');
      if (emote) client.party.me.setEmote(emote.id);
      else message.reply(`Emote ${content} wasn't found!`);
    } else if (command === 'dev:set:pickaxe') {
      const pickaxe = findCosmetic(content, 'pickaxe');
      if (pickaxe) client.party.me.setPickaxe(pickaxe.id);
      else message.reply(`Pickaxe ${content} wasn't found!`);
    } else if (command === 'dev:ready') {
      client.party.me.setReadiness(true);
    } else if (command === 'dev:unready') {
      client.party.me.setReadiness(false);
    } else if (command === 'dev:set:purpleskull') {
      client.party.me.setOutfit('CID_030_Athena_Commando_M_Halloween', [{ channel: 'ClothingColor', variant: 'Mat1' }]);
    } else if (command === 'dev:set:pinkghoul') {
      client.party.me.setOutfit('CID_029_Athena_Commando_F_Halloween', [{ channel: 'Material', variant: 'Mat3' }]);
    } else if (command === 'dev:level') {
      client.party.me.setLevel(parseInt(content, 10));
    } else if (command === 'dev:add') {
      client.addFriend(content)
      message.reply(`${content} Has been sent a friend request!`)
    } else if (command === 'dev:unadd') {
      client.removeFriend(content)
      message.reply(`${content} has been unadded!`)
    } else if (command === 'dev:restartclient') {
      message.reply("Fortnite Client Is Restarting!")
      client.restart()
    } else if (command === 'dev:kill') {
      message.reply("Bot is dead")
      console.log("[PARTY] RIP bot\nBot was killed!")
      process.exit(1)
    } else if (command === "dev:stop:timer") {
      if (timerstatus == true) {
        timerstatus = false
        let id = this.ID
        console.log(`[PARTY] timer id: ${id}`)
        clearTimeout(id)
        console.log("[PARTY] Time has stoped!")
        message.reply("Time has been stoped!")
      }
    }
  };

  client.on('friend:message', (m) => handleCommand(m, m.author));




  client.on("party:member:updated", async (Member) => {
    if (Member.id == client.user.id) {
      return;
    }


    if (!client.party.me) {
      return;
    }

      
    if ((Member.isReady && (client?.party?.me?.isLeader || Member.isLeader) && !client.party?.me?.isReady) && !client.party.bManualReady) {

      if (client.party?.me?.isLeader) {
        await Member.promote();
      }

      client.party.me.setReadiness(true);
    }
    else if ((!Member.isReady && Member.isLeader) && !client.party.bManualReady) {
      try {
        client.WSS.close()
      } catch { }
      client.party.me.setReadiness(false);
    }


    var bAllmembersReady = true;

    client.party.members.forEach(member => {
      if (!bAllmembersReady) {
        return;
      }

      bAllmembersReady = member.isReady;
    });

  })

  client.on('friend:request', async (request) => {
    if (addusers === true) {
      await request.accept()
    } else if (addusers === false) {
    await request.decline();
    client.party.chat.send(`Sorry, ${request.displayName} I dont accept friend requests!`)
    }
    }
  )


  client.on('party:invite', async (request) => {
    party = client.party
    if ([1] == party.size) {
      await request.accept();
    }
    else {
      await request.decline()
    }
  }
  );

  async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  client.on('party:member:joined', async (join) => {
    client.party.me.sendPatch({'Default:AthenaCosmeticLoadout_j': '{"AthenaCosmeticLoadout":{"cosmeticStats":[{"statName":"TotalVictoryCrowns","statValue":0},{"statName":"TotalRoyalRoyales","statValue":999},{"statName":"HasCrown","statValue":0}]}}',})
    await client.party.me.setOutfit(cid);
    console.log(`Join ${join.displayName}`)
    party = client.party
    await client.party.me.setBackpack(bid)
    await sleep(1.5)
    const minute = 600000
    
    let time = 1 * minute
    function leavepartyexpire() {
      client.party.chat.send("Time expired!")
      client.party.leave()
      console.log("[PARTY] Left party due to party time expiring!")
      console.log("[PARTY] Time tracking stoped!")
      timerstatus = false
    }
    if ([1] != party.size) {
    console.log("[PARTY] Time has started!")
    this.ID = setTimeout(leavepartyexpire, bot_leave_time)
    timerstatus = true
    
    }
    client.party.me.setEmote(eid);
    if ([2] == party.size) {
      client.party.chat.send(bot_join_message)
      client.setStatus(bot_use_status, bot_use_onlinetype)
    }
    if ([3] == party.size) {
      client.party.chat.send(bot_join_message)
      client.setStatus(bot_use_status, bot_use_onlinetype)
    }
    if ([4] == party.size) {
      client.party.chat.send(bot_join_message)
      client.setStatus(bot_use_status, bot_use_onlinetype)
    }
    if ([1] == party.size) {
      client.setStatus(bot_invite_status, bot_invite_onlinetype)
      await client.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
      if (client.party?.me?.isReady) {
        client.party.me.setReadiness(false);
      };
      if (timerstatus == true) {
        timerstatus = false
        let id = this.ID
        clearTimeout(id)
        console.log("[PARTY] Time has stoped!")
      };
    }
  })

  client.on('party:member:left', async (left) => {
    console.log(`left ${left.displayName}`)
    
    if ([2] == party.size) {
      client.party.chat.send(bot_join_message)
      client.setStatus(bot_use_status, bot_use_onlinetype)
    }
    if ([3] == party.size) {
      client.party.chat.send(bot_join_message)
      client.setStatus(bot_use_status, bot_use_onlinetype)
    }
    if ([4] == party.size) {
      client.party.chat.send(bot_join_message)
      client.setStatus(bot_use_status, bot_use_onlinetype)
    }
    if ([1] == party.size) {
      client.setStatus(bot_invite_status, bot_invite_onlinetype)
      await client.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
      if (client.party?.me?.isReady) {
        client.party.me.setReadiness(false);
      };
      if (timerstatus == true) {
        timerstatus = false
        let id = this.ID
        clearTimeout(id)
        console.log("[PARTY] Time has stoped!")
      };
    }
  })
if (run_discord_client === true) {
dclient.login(process.env['DISCORD_TOKEN'])
} else if (run_discord_client === false) {
  console.log("[DISCORD] client is disabled!")
}
})();
