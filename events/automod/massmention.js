const { MessageEmbed } = require("discord.js");
const { massMention } = require("../../configs/automod.json");
const { automod_logs } = require("../../configs/logs.json");
const { embedColor } = require("../../configs/config.json");
module.exports = (client) => {
  client.on("message", async (message) => {
    if (massMention.working) {
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
      if (message.author.bot) return;
      ignoredChannelId = massMention.ignoredChannelsId;
      let j;
      for (j = 0; j < ignoredChannelId.length; j++) {
        if (message.channel.id === ignoredChannelId[j]) return;
      }
      //checking for ignored members
      ignoredMembersId = massMention.ignoredMemberId;
      // console.log(ignoredMembersId);
      let m;
      for (m = 0; m < ignoredMembersId.length; m++) {
        if (message.author.id === ignoredMembersId[m]) return;
      }
      const ignoredRolesId = massMention.ignoredRoleId;
      let k;
      for (k = 0; k < ignoredRolesId.length; k++) {
        if (message.member.roles.cache.has(ignoredRolesId[k])) return;
      }
      const mention = message.mentions.users || message.mentions.roles;

      // console.log(mention);

      if (mention.size >= massMention.noOfInvalidMentions) {
        message.delete();
        const badwordsEmbed = new MessageEmbed()
          .setAuthor("Automod Logs")
          .setTimestamp()
          .setTitle("Mass Mentions")
          .setColor(embedColor)
          .addFields(
            {
              name: "Mentioned By:",
              value: `<@${message.author.id}>`,
              inline: true,
            },
            {
              name: "Channel Used:",
              value: `<#${message.channel.id}>`,
              inline: true,
            },
            {
              name: "Mentions",
              value: `${message.content}`,
            }
          );
        message
          .reply(`Too many Mentions! don't do that.`)
          .then((msg) => {
            msg.delete({ timeout: 3000 });
            if (logsChannel) {
              logsChannel.send(badwordsEmbed);
            }
          })
          .catch(console.error);
      }
    }
  });
};
module.exports.config = {
  displayName: "massmention",
  dbName: "automod",
};
