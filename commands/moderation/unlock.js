const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
const { moderation } = require("@config/commands.json");

module.exports = {
  name: "unlock",
  commands: ["unlock"],
  description: "unlocks Channel",
  callback: (message, args) => {
    const { guild, channel, author } = message;
    if (moderation.lock.working) {
      //   console.log(message.guild.defaultRole);
      if (moderation.lock.defaultRole) {
        let eveRole = moderation.lock.defaultRole;
        message.channel.updateOverwrite(eveRole, {
          SEND_MESSAGES: true,
        });
      } else {
        const role = args[0];
        const eve = guild.roles.cache.get(role);
        if (!eve) return message.reply(`Please mention a Valid role ID`);
        message.channel.updateOverwrite(role, {
          SEND_MESSAGES: true,
        });
      }
    }
  },
};
