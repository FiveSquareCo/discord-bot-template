const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
const { info } = require("@config/commands.json");
module.exports = {
  name: "userinfo",
  category: "info",
  commands: ["userinfo", "ui", "infouser"],
  description: "information about user",
  callback: async (message) => {
    const { author, guild } = message;
    // console.log(author.presence.activities);
    if (info.userinfo.working) {
      const user = message.mentions.users.first() || message.author;
      const member = guild.members.cache.get(user.id);
      // console.log(user);
      const name = user.username;
      const highRole = member.roles.highest;
      // console.log(highRole);
      const userInfoembed = new MessageEmbed()
        .setTitle(`**Information of user *${name}* !**`)
        .setColor(config.embedColor)
        .setFooter(`Req. by ${author.tag}`)
        .setThumbnail(
          user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
        )
        .setTimestamp().setDescription(`
        :white_small_square: **User Id  :**  ${user.id}
        :white_small_square: **User Tag  :** ${user.tag}
        :white_small_square: **Nick Name :** ${member.nickname || "No Nickname"}
        :white_small_square: **Bot/Human  :** ${user.bot ? "Bot" : "Human"}
        :white_small_square: **Joined Discord  :** ${new Date(
          user.createdTimestamp
        ).toDateString()}
        :white_small_square: **Joined Server  :** ${new Date(
          member.joinedTimestamp
        ).toDateString()}
        :white_small_square: **Roles  :**  ${member.roles.cache.size - 1}
        :white_small_square: **Highest Role  :** ${highRole} `);
      message.channel.send(userInfoembed);
    }
  },
};
