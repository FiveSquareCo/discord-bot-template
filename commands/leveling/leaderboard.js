const levelSchema = require("@schema/levelSchema");
const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
module.exports = {
  name: "leaderboard",
  commands: ["leaderboard", "lb", "top"],
  description: "leaderboard",
  category: "leveling",
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
      let { user } = message.guild.members.cache.get(userId);
      // console.log(user.username);
      desc += `**#${counter + 1} ${user.username}#${user.discriminator} **
      **- Level:** ${level} , **Xp:** ${xp}  
      \n`;
    }
    // console.log(desc);
    const lbEmbed = new MessageEmbed()
      .setTitle(`**Leadeboard of *${message.guild.name}* !**`)
      .setColor(config.embedColor)
      .setFooter(`Leaderboard As of`)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      .setDescription(desc);
    message.channel.send(lbEmbed);
  },
};
