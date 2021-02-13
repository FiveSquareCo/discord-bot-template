const afkSchema = require("./../../models/afkSchema");
const { MessageEmbed } = require("discord.js");
const config = require("./../../configs/config.json");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot) return;
    const { author, guild, mentions } = message;
    if (message.content.startsWith("+afkstats")) {
      // console.log("yes");
      return;
    }
    // if (message.content.startsWith("+setafk")) {
    //   // console.log("yes");
    //   return;
    // }

    const userID = author.id;
    const guildID = guild.id;
    const member = guild.members.cache.get(userID);
    const changeNickname = async (member) => {
      if (member.nickname.startsWith("[AFK]")) {
        const name = member.nickname.replace("[AFK] ", "");
        member.setNickname(name);
      } else return;
    };
    await afkSchema.findOneAndRemove(
      { userId: userID, guildId: guildID },
      async (error, res) => {
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
          await message.channel.send(removeAfkEmbed);
          await changeNickname(member);
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
