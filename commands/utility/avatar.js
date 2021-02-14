const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config");

module.exports = {
  name: "avatar",
  commads: ["avatar"],
  aliases: ["av", "dp", "pfp"],
  description: "Desplay avatar of user",
  maxArgs: 1,
  category: "utility",
  callback: ({ message }) => {
    if (message.channel.type === "dm") return;
    const user = message.mentions.users.first() || message.author;
    const username = user.username;
    const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 512 });
    const avatarEmbed = new MessageEmbed()
      .setColor(config.embedColor)
      .setTitle(`Avatar of ${username}`)
      .setDescription(`[Click Here](${avatarUrl}) to Download Avatar`)
      .setImage(avatarUrl);
    message.channel.send(avatarEmbed);
    user.displayAvatarURL({ dynamic: true, size: 512 });
  },
};
