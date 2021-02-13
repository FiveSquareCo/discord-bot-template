const { MessageEmbed } = require("discord.js");
const afkSchema = require("../../../models/afkSchema");
const { misc } = require("../../../configs/commands");
const config = require("../../../configs/config.json");

module.exports = {
  name: "removeafk",
  category: "afk",
  commads: ["removeafk", "remafk"],
  description: "set a user AFK",
  callback: async ({ message, args }) => {
    if (misc.afk.working) {
      const { author, guild } = message;

      const userId = author.id;
      const guildId = guild.id;
      const member = guild.members.cache.get(userId);
      const changeNickname = async (member) => {
        if (member.nickname.startsWith("[AFK]")) {
          const name = member.nickname.replace("[AFK] ", "");
          member.setNickname(name);
        }
      };
      const result = await afkSchema.findOneAndRemove(
        { userId, guildId },
        async (error, result) => {
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
            await message.channel.send(removeAfkEmbed);
            await changeNickname(member);
            return;
          }
          if (!result) {
            return message.reply(
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
