const { MessageEmbed } = require("discord.js");
const afkSchema = require("@schema/afkSchema");
const { misc } = require("@config/commands.json");
const config = require("@config/config.json");

module.exports = {
  name: "setafk",
  commads: ["setafk", "afkset"],
  category: "afk",
  description: "set a user AFK",
  maxArgs: -1,
  minArgs: 1,
  expectedArgs: "<reason>",
  callback: async (message, args) => {
    if (misc.afk.working) {
      const { author, guild } = message;

      const userId = author.id;
      const guildId = guild.id;

      const reason = args.join(" ");
      // console.log(author.id, guild.id, reason);
      const result = await afkSchema.findOneAndUpdate(
        {
          userId,
          guildId,
        },
        { userId, guildId, reason },
        {
          upsert: true,
          new: true,
        }
      );
      // console.log(result);
      if (!result) {
        message.reply("There was a error! please try again");
        return;
      }
      const setAfkEmbed = new MessageEmbed()
        .setAuthor(`Set AFK`)
        .setColor(config.embedColor)
        .setDescription(
          `
     ${author.username},I added you to afk list!\n
     **Reason:** ${reason}  \n
    when you come back onlne use "${config.prefix}removeafk" to remove you from AFK list.
    `
        )
        .setFooter(`Set you afk`)
        .setTimestamp();
      message.channel.send(setAfkEmbed);
    }
  },
};

// +setafk Reason
