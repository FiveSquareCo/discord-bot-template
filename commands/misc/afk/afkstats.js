const { MessageEmbed } = require("discord.js");
const afkSchema = require("../../../models/afkSchema");
const { misc } = require("../../../configs/commands.json");
const config = require("../../../configs/config.json");

module.exports = {
  name: "afkstats",
  category: "afk",
  commads: ["afkstats", "amiafk", "meafk", "statsafk"],
  description: "AFK stats",
  callback: async ({ message, args }) => {
    if (misc.afk.working) {
      const { author, guild } = message;

      const userId = author.id;
      const guildId = guild.id;
      const results = await afkSchema.findOne(
        { guildId, userId },
        (err, result) => {
          if (err) return message.reply(`There was an error!Please try again.`);
          if (result) {
            const { reason } = result;
            const afkStatsEmbed = new MessageEmbed()
              .setAuthor(`AFK stats`)
              .setColor(config.embedColor)
              .setFooter(`you are AFK`)
              .setTimestamp().setDescription(`
            ${author.username}, You are AKF.\n
            **Reason:** ${reason}\n
            use "+removeafk" to remove you from afk list.
            `);
            message.channel.send(afkStatsEmbed);
            return;
          }
          if (!result) {
            message.reply(`you are not AFK`);
          }
        }
      );
    }
  },
};
