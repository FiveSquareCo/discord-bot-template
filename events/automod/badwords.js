const { badwords } = require("./../../configs/badwords.json");
const { badwords: curse } = require("./../../configs/automod.json");
const { automod_logs } = require("../../configs/logs.json");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../../configs/config.json");
module.exports = async (client) => {
  client.on("message", (message) => {
    if (curse.working) {
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
      //author bot
      const msgContent = message.content.toLowerCase();
      const splitMessage = msgContent.split(" ");
      // console.log(splitMessage);
      if (message.author.bot) return;
      //checking for working
      if (curse.working) {
        //checking for ignored channels
        ignoredChannelId = curse.ignoredChannelsId;
        let j;
        for (j = 0; j < ignoredChannelId.length; j++) {
          if (message.channel.id === ignoredChannelId[j]) return;
        }
        //checking for ignored members
        ignoredMembersId = curse.ignoredMemberId;
        // console.log(ignoredMembersId);
        let m;
        for (m = 0; m < ignoredMembersId.length; m++) {
          if (message.author.id === ignoredMembersId[m]) return;
        }
        //checking for word
        let i;
        let wordUsed;
        let badwordUse = false;
        for (i = 0; i < badwords.length; i++) {
          if (splitMessage.includes(badwords[i].toLowerCase())) {
            badwordUse = true;
            if (badwordUse) {
              wordUsed = badwords[i];
            }
          }
        }
        if (badwordUse) {
          message.delete();
          const badwordsEmbed = new MessageEmbed()
            .setAuthor("Automod Logs")
            .setTimestamp()
            .setTitle("Bad Words")
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
                name: "Word used:",
                value: `${wordUsed}`,
              }
            );
          message
            .reply(`Dont Use Bad Words`)
            .then((msg) => {
              if (logsChannel) {
                logsChannel.send(badwordsEmbed);
              }
              msg.delete({ timeout: 3000 });
            })
            .catch(console.error);
        }
      }
    }
  });
};
module.exports.config = {
  displayName: "badwords",
  dbName: "automod",
};
