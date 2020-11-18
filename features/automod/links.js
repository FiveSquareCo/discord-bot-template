const { links } = require("@config/links.json");
const { links: link } = require("@config/automod.json");
module.exports = async (client) => {
  client.on("message", (message) => {
    // console.log(message);
    if (message.author.bot) return;
    if (link.working) {
      //checking for ignored channels
      ignoredChannelId = link.ignoredChannelsId;
      let j;
      for (j = 0; j < ignoredChannelId.length; j++) {
        if (message.channel.id === ignoredChannelId[j]) return;
      }
      //checking for ignored members
      ignoredMembersId = link.ignoredMemberId;
      // console.log(ignoredMembersId);
      let m;
      for (m = 0; m < ignoredMembersId.length; m++) {
        if (message.author.id === ignoredMembersId[m]) return;
      }

      let i;
      let linkUsed;
      let linkUse = false;
      for (i = 0; i < links.length; i++) {
        if (message.content.toLowerCase().includes(links[i].toLowerCase())) {
          linkUse = true;
          if (linkUse) {
            linkUsed = links[i];
          }
        }
      }
      if (linkUse) {
        message.delete();
        message
          .reply(`Please Dont Share links in this channel.`)
          .then((msg) => {
            msg.delete({ timeout: 3000 });
          })
          .catch(console.error);
      }
    }
  });
};
