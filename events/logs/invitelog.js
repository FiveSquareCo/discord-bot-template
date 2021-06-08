const { MessageEmbed } = require("discord.js");
const { invite_logs } = require("../../configs/logs.json");
const { getMinutes } = require("../../utils/functions");
module.exports = (client) => {
  if (!invite_logs.working || invite_logs.channel_ID === "channel_id_here")
    return;
  const logsChannel = client.channels.cache.get(invite_logs.channel_ID);
  //Invite Create
  client.on("inviteCreate", (invite) => {
    const inviteCreatedEmbed = new MessageEmbed()
      .setAuthor("Invite Logs")
      .setTitle("Invite Link Created")
      .setColor(client.embedColor)
      .setTimestamp()
      .setDescription(
        `**${invite.inviter.tag}** Created An Invite.\n **Expires  :** ${
          invite.maxAge === 0 ? "Never" : getMinutes(invite.maxAge)
        }\n **Invite Link  :** ${invite.url}`
      );
    console.log(invite.maxAge);
    logsChannel.send(inviteCreatedEmbed);
  });
};
module.exports.config = {
  displayName: "invite-logs",
  dbName: "invite-logs",
};
