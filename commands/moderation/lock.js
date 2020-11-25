const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
const { moderation } = require("@config/commands.json");

module.exports = {
  name: "lock",
  commands: ["lock"],
  description: "Locks Channel",
  callback: async (message, args) => {
    const serverId = message.guild.id;
    const channelId = message.channel.id;
    let logChannelId;
    let logChannel;
    if (config.moderation.modlogsChannelId) {
      logChannelId = config.moderation.modlogsChannelId;
      logChannel = message.guild.channels.cache.get(logChannelId);
    }
    let outputMessageId;
    const { guild, channel, author } = message;
    if (moderation.lock.working) {
      if (moderation.lock.defaultRole) {
        let eveRole = moderation.lock.defaultRole;
        message.channel.updateOverwrite(eveRole, {
          SEND_MESSAGES: false,
        });

        await message.channel
          .send(`Locked The Channel`)
          .then((msg) => {
            outputMessageId = msg.id;
          })
          .then(logChannel.send());
      } else {
        const role = args[0];
        const eve = guild.roles.cache.get(role);
        if (!eve) return message.reply(`Please mention a Valid role ID`);
        message.channel.updateOverwrite(role, {
          SEND_MESSAGES: false,
        });
      }
    }
  },
};