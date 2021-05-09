const { MessageEmbed } = require("discord.js");
const { welcome_logs } = require("../../configs/logs.json");
module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    if (!welcome_logs.working || welcome_logs.channel_ID === "channel_id_here")
      return;
    const logChannel = client.channels.cache.get(welcome_logs.channel_ID);
    const welcomeEmbed = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor("Welcome Logs")
      .setDescription(
        `${member.user.tag} Joined The Server and they are ${member.guild.memberCount}th Member!`
      )
      .setTimestamp();
    logChannel.send(welcomeEmbed);
  });
};

module.exports.config = {
  displayName: "welcome",
  dbName: "welcome",
};
