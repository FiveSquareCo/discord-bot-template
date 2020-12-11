const { MessageEmbed } = require("discord.js");
const afkSchema = require("@schema/afkSchema");
const { misc } = require("@config/commands.json");
const config = require("@config/config.json");

module.exports = {
  name: "removeafk",
  category: "afk",
  commads: ["removeafk", "remafk"],
  description: "set a user AFK",
  callback: async (message, args) => {
    if (misc.afk.working) {
      const { author, guild } = message;

      const userId = author.id;
      const guildId = guild.id;
      const result = await afkSchema.findOneAndRemove(
        { userId, guildId },
        (error, result) => {
          if (error)
            return message.reply(`There was an error please try again!`);
          if (result) {
            //   console.log("RESULT:", result);
            const removeAfkEmbed = new MessageEmbed()
              .setAuthor(`Remove AFK`)
              .setColor(config.embedColor)
              .setTimestamp()
              .setFooter(`Removed you afk`).setDescription(`
        ${author.username} , I removed you from Afk list!
        `);
            message.channel.send(removeAfkEmbed);
          }
          if (!result) {
            message.reply(
              `You were not AFK! use "${config.prefix}setafk" to set you afk.`
            );
          }
        }
      );
      // CSSConditionRule.log(result);
    }
  },
};

// +removeafk Reason
