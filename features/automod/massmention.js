const { MessageEmbed } = require("discord.js");
const { massMention } = require("@config/automod.json");
module.exports = (client) => {
  client.on("message", async (message) => {
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
    const mention = message.mentions.users;
    // console.log(mention);
    if (mention.size >= massMention.noOfInvalidMentions) {
      message.delete();
      message
        .reply(`Too many Mentions! don't do that.`)
        .then((msg) => {
          msg.delete({ timeout: 3000 });
        })
        .catch(console.error);
    }
  });
};
