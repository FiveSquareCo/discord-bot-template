const { links: link } = require("../../configs/automod.json");
module.exports = async (client) => {
  client.on("message", (message) => {
    // console.log(message);
    if (message.author.bot) return;
    if (link.working) {
      //checking for ignored channels
      // ignoredChannelId = link.ignoredChannelsId;
      // let j;
      // for (j = 0; j < ignoredChannelId.length; j++) {
      //   if (message.channel.id === ignoredChannelId[j]) return;
      // }
      // //checking for ignored members
      // ignoredMembersId = link.ignoredMemberId;
      // // console.log(ignoredMembersId);
      // let m;
      // for (m = 0; m < ignoredMembersId.length; m++) {
      //   if (message.author.id === ignoredMembersId[m]) return;
      // }

      function is_url(str) {
        let regexp = /^(?:(?:https?|ftp?|http):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
          return true;
        } else {
          return false;
        }
      }
      const Words = message.content.split(" ");

      let i;
      let linkSent;
      let linkused = false;
      for (i = 0; i < Words.length + 1; i++) {
        // console.log(Words[i]);
        if (is_url(Words[i]) === true) {
          console.log(words[i]);
          linkused = true;
          if (linkused) {
            linkSent = Words[i];
          }
        }
      }
      // if (is_url(message.content.split(" ")) === true) {
      //   message.delete();
      //   message.reply("No Links here");
      // }
      if (linkused) {
        message.delete();
        message.reply("Please Dont Send Links Here!");
      }
    }
  });
};
module.exports.config = {
  displayName: "links",
  dbName: "automod",
};
