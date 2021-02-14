const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../configs/config.json");
const { message_logs } = require("../configs/logs.json");
module.exports = (client) => {
  let channelId;
  if (message_logs.channel_ID === "channel_id_here") return;
  if (message_logs.channel_ID != "channel_id_here") {
    channelId = message_logs.channel_ID;
  }
  client.on("messageUpdate", async (oldM, newM) => {
    if (message_logs.working) {
      let channelId;
      if (message_logs.channel_ID === "channel_id_here") return;
      if (message_logs.channel_ID != "channel_id_here") {
        channelId = message_logs.channel_ID;
      }
      if (oldM.content === newM.content) return;
      const messageLinkEp = `https://discordapp.com/channels/${oldM.guild.id}/${oldM.channel.id}/${oldM.id}`;
      const messageUpdateog = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor("Message Update Log")
        .setTimestamp()
        .setDescription(
          `
    **Old Message  - ** ${oldM.content}
    **New Message  - ** ${newM.content}`
        )
        .addFields(
          {
            name: "Member:",
            value: `<@${oldM.author.id}>`,
            inline: true,
          },
          {
            name: "Channel Used:",
            value: `<#${oldM.channel.id}>`,
            inline: true,
          },
          {
            name: "Message link:",
            value: `[Click here](${messageLinkEp})`,
          }
        );
      const channel = oldM.guild.channels.cache.get(channelId);
      channel.send(messageUpdateog);
    }
  });
  client.on("messageDelete", async (message) => {
    if (message_logs.working) {
      let channelId;
      if (message_logs.channel_ID === "channel_id_here") return;
      if (message_logs.channel_ID != "channel_id_here") {
        channelId = message_logs.channel_ID;
      }
      const messageUpdateog = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor("Message Delete Log")
        .setTimestamp()
        .setDescription(
          `
   **Message Content  : ** ${message.content}`
        )
        .addFields(
          {
            name: "Member:",
            value: `<@${message.author.id}>`,
            inline: true,
          },
          {
            name: "Channel Used:",
            value: `<#${message.channel.id}>`,
            inline: true,
          }
        );
      const channel = message.guild.channels.cache.get(channelId);
      channel.send(messageUpdateog);
    }
  });
};

module.exports.config = {
  displayName: "message-logs",
  dbName: "message-logs",
};
