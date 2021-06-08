const { MessageEmbed } = require("discord.js");
const { massEmoji } = require("../../configs/automod.json");
const { automod_logs } = require("../../configs/logs.json");
const { embedColor } = require("../../configs/config.json");

module.exports = (client) => {
  client.on("message", (message) => {
    if (message.author.bot) return;
    if (massEmoji.working) {
      return;
      let logsChannel;

      if (automod_logs.working) {
        if (automod_logs.channel_ID != "channel_id_here") {
          logsChannelid = message.guild.channels.cache.get(
            automod_logs.channel_ID
          );
          if (logsChannelid) {
            logsChannel = logsChannelid;
          }
        }
      }
      ignoredChannelId = massEmoji.ignoredChannelsId;
      let j;
      for (j = 0; j < ignoredChannelId.length; j++) {
        if (message.channel.id === ignoredChannelId[j]) return;
      }
      //checking for ignored members
      ignoredMembersId = massEmoji.ignoredMemberId;
      // console.log(ignoredMembersId);
      let m;
      for (m = 0; m < ignoredMembersId.length; m++) {
        if (message.author.id === ignoredMembersId[m]) return;
      }
      const ignoredRolesId = massEmoji.ignoredRoleId;
      let k;
      for (k = 0; k < ignoredRolesId.length; k++) {
        const role = message.guild.roles.cache.get(ignoredRolesId[k]);
        if (message.member.roles.cache.has(role)) return;
      }
      const MessageContentArray = message.content.split(">");
      let number = 0;
      for (let i = 0; i < MessageContentArray.length; i++) {
        MessageContentArray.includes("<:" || ":>");
        number++;
      }

      if (number >= massEmoji.noOfInvalidMentions) {
        message.delete();
        message.reply("Ahh! Too Many Emojis, Dont send Again").then((msg) => {
          msg.delete({ timeout: 3000 });
          const badwordsEmbed = new MessageEmbed()
            .setAuthor("Automod Logs")
            .setTimestamp()
            .setTitle("Mass Emojis")
            .setColor(embedColor)
            .addFields(
              {
                name: "User:",
                value: `<@${message.author.id}>`,
                inline: true,
              },
              {
                name: "Channel Used:",
                value: `<#${message.channel.id}>`,
                inline: true,
              },
              {
                name: "Emojis Sent:",
                value: `${message.content}`,
                inline: true,
              },
              {
                name: "Emoji Count:",
                value: number - 1,
                inline: true,
              }
            );
          if (logsChannel) {
            logsChannel.send(badwordsEmbed);
          }
        });
      }
    }
  });
};

module.exports.config = {
  displayName: "massemoji",
  dbName: "automod",
};
