const { MessageEmbed } = require("discord.js");
const { welcome_logs } = require("../../configs/logs.json");
module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    if (!welcome_logs.working || welcome_logs.channel_ID === "channel_id_here")
      return;
    const logChannel = client.channels.cache.get(welcome_logs.channel_ID);
    const leaveEmbed = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor("Leave Logs")
      .setDescription(`${member.user.tag} Just Left The Server!`)
      .setTimestamp();
    logChannel.send(leaveEmbed);
  });
};

module.exports.config = {
  displayName: "leave",
  dbName: "leave",
};
