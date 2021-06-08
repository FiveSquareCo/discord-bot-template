const { links: link } = require("../../configs/automod.json");
const { automod_logs } = require("../../configs/logs.json");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../../configs/config.json");
module.exports = async (client) => {
  client.on("message", (message) => {
    // console.log(message);
    if (message.author.bot) return;
    if (link.working) {
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
      // checking for ignored channels
      const ignoredChannelId = link.ignoredChannelsId;
      let j;
      for (j = 0; j < ignoredChannelId.length; j++) {
        if (message.channel.id === ignoredChannelId[j]) return;
      }
      //checking for ignored members
      const ignoredMembersId = link.ignoredMemberId;
      // console.log(ignoredMembersId);
      let m;
      for (m = 0; m < ignoredMembersId.length; m++) {
        if (message.author.id === ignoredMembersId[m]) return;
      }
      //check for ignored roles
      const ignoredRolesId = link.ignoredRoleId;
      let k;
      for (k = 0; k < ignoredRolesId.length; k++) {
        if (message.member.roles.cache.has(roignoredRolesId[k])) return;
      }
      let linkused = false;
      let linkURI;
      function is_url(str) {
        let regexp =
          /^(?:(?:https?|ftp?|http):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
          linkused = true;
          linkURI = str;
        } else {
          linkused = false;
        }
      }
      is_url(message.content);

      if (linkused) {
        message.delete();
        const badwordsEmbed = new MessageEmbed()
          .setAuthor("Automod Logs")
          .setTimestamp()
          .setTitle("Links")
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
              name: "Link Sent:",
              value: `${linkURI}`,
            }
          );
        message.reply("Please Dont Send Links Here!").then((msg) => {
          msg.delete({ timeout: 3000 });
          if (logsChannel) {
            logsChannel.send(badwordsEmbed);
          }
        });
      }
    }
  });
};
module.exports.config = {
  displayName: "links",
  dbName: "automod",
};
