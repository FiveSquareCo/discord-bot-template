const { badwords } = require("@config/badwords.json");
const { badwords: curse } = require("@config/automod.json");
module.exports = async (client) => {
  client.on("message", (message) => {
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
        message
          .reply(`Dont Use Bad Words`)
          .then((msg) => {
            msg.delete({ timeout: 3000 });
          })
          .catch(console.error);
      }
    }
  });
};
module.exports.config = {
  displayName: "badwords",
  dbName: "automod",
};
