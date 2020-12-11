const { MessageEmbed } = require("discord.js");
const muteSchema = require("@schema/muteSchema");

module.exports = {
  name: "unmute",
  commands: ["unmute"],
  aliases: ["um"],
  description: "unMuting a User",
  minArgs: 1,
  category: "moderation",
  cooldown: "5s",
  expectedArgs: "{PREFIX}mute [<@ user-id> or <user-tag>]",
  callback: async (message, args) => {
    const { guild } = message;
    let id = "";
    const target = message.mentions.users.first();
    if (target) {
      id = target.id;
    } else {
      id = args[0];
    }
    const results = await muteSchema.updateOne(
      {
        guildId: guild.id,
        userId: id,
        current: true,
      },
      {
        current: false,
      }
    );
    // console.log("RESULT:", results);

    if (results.nModified === 1) {
      const role = guild.roles.cache.find((role) => {
        return role.name === "Muted";
      });
      if (role) {
        const guildMember = guild.members.cache.get(id);
        guildMember.roles.remove(role);
      }
      message.reply(`Unmuted`);
    } else {
      message.reply("The Mentioned User is not muted");
    }
  },
};
