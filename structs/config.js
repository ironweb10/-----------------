const nconf = require('nconf');
require('dotenv').config();
const config = nconf.argv().env().file({ file: 'config.json' });

module.exports = {
  run_discord_client: nconf.get('discord:run_discord_client'),
  discord_crash_command: nconf.get('discord:disable_crash_command'),
  DISCORD_TOKEN: process.env['DISCORD_TOKEN'],
  cid: nconf.get("fortnite:cid"),
  bid: nconf.get('fortnite:bid'),
  blacklist: nconf.get('fortnite:blacklisted'),
  whitelist: nconf.get('fortnite:whitelist'),
  eid: nconf.get('fortnite:eid'),
  level: nconf.get('fortnite:level'),
  banner: nconf.get('fortnite:banner'),
  web_message: nconf.get('system:web_message'),
  reload: nconf.get('system:reload'),
  join_users: nconf.get('fortnite:join_users'),
  reload_time: nconf.get('system:reload_time'),
  bot_loading_message: nconf.get('system:bot_loading_message'),
  bot_use_status: nconf.get('fortnite:inuse_status'),
  bot_use_onlinetype: nconf.get('fortnite:inuse_onlinetype'),
  bot_invite_status: nconf.get('fortnite:invite_status'),
  bot_invite_onlinetype: nconf.get('fortnite:invite_onlinetype'),
  bot_join_message: nconf.get('fortnite:join_message'),
  bot_leave_time: nconf.get('fortnite:leave_time'),
  addusers: nconf.get('fortnite:add_users'),
  displayName: nconf.get("logs:name"),
  whilelist: nconf.get('fortnite:whilelist'),
  leave_after: nconf.get("fortnite:leave_after_success"),
  discord_status: nconf.get('discord:status'),
  discord_status_type: nconf.get('discord:status_type'),
  send_webhook: nconf.get('discord:send_webhook'),
  
};
