const afkSchema = require("@schema/afkSchema");
const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    const { author, guild, mentions } = message;
    if (message.content.startsWith("+afkstats")) {
      console.log("yes");
      return;
    }

    const userID = author.id;
    const guildID = guild.id;
    await afkSchema.findOneAndRemove(
      { userId: userID, guildId: guildID },
      (error, res) => {
        if (error) return;
        if (res) {
          const removeAfkEmbed = new MessageEmbed()
            .setAuthor(`Remove AFK`)
            .setColor(config.embedColor)
            .setTimestamp()
            .setFooter(`Removed you afk`).setDescription(`
        ${author.username} , I removed you from Afk list!\n
        **Reason:** You replied to a message, without remobing AFK tag.
        `);
          message.channel.send(removeAfkEmbed);
          return;
        }
      }
    );
    const target = mentions.users.first();
    // console.log();
    if (!target) return;

    const userId = target.id;
    const guildId = guild.id;
    await afkSchema.findOne({ userId, guildId }, (err, results) => {
      if (err) return;
      if (!results) return;
      if (results) {
        const { reason } = results;
        message.reply(`${target.username} Is Now AFK! **Reason:** ${reason}`);
        return;
      }
    });
  });
};
module.exports.config = {
  displayName: "afk",
  dbName: "afks",
};

//
