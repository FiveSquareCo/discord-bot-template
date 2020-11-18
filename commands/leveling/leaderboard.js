const levelSchema = require("@schema/levelSchema");
const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
module.exports = {
  name: "leaderboard",
  commands: ["leaderboard"],
  aliases: ["lb", "top"],
  description: "leaderboard",
  callback: async (message) => {
    let desc = "";

    const guildId = message.guild.id;
    const results = await levelSchema
      .find({
        guildId,
      })
      .sort({
        level: -1,
        xp: -1,
      })
      .limit(10);
    for (let counter = 0; counter < results.length; ++counter) {
      const { userId, level, xp } = results[counter];
      desc += `${
        counter + 1
      } <@${userId}> is ${level} and with ${xp} xp \n\n\n`;
    }
    // console.log(desc);
    const lbEmbed = new MessageEmbed()
      .setColor(config.embedColor)
      .setFooter(`Leaderboard As of`)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      .setDescription(desc);
    message.channel.send(lbEmbed);
  },
};
