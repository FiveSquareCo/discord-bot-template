const { suggestions } = require("./../configs/features.json");
const { MessageEmbed } = require("discord.js");

const messageStatus = {
  PROGRESS: {
    text: "📈 under progress or wating for community feedback, please vote!",
    color: 0xffea00,
  },
  ACCEPTED: {
    text: "✅ Suggestion Accepted! we will work on this for sure!",
    color: 0x34eb5b,
  },
  DENIED: {
    text:
      "❌ Thank you for the suggestion, but we are not intrested at this point of time! we might concider in future.",
    color: 0xc20808,
  },
};
let sc;
module.exports = (client) => {
  if (suggestions.working) {
    if (suggestions.suggestionsChannelId) {
      sc = suggestions.suggestionsChannelId;
      client.on("message", (message) => {
        if (message.author.bot) return;
        const {
          channel: { id },
          author,
        } = message;
        if (suggestions.suggestionsChannelId === id) {
          message.delete();
          const status = messageStatus.PROGRESS;

          const suggestionEmbed = new MessageEmbed()
            .setColor(status.color)
            .setAuthor(
              `${author.username}#${author.discriminator}`,
              author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(message.content)
            .addFields({
              name: "status",
              value: status.text,
            })
            .setFooter(`Want to suggest something? just type in this channel`)
            .setTimestamp();

          message.channel.send(suggestionEmbed).then((msg) => {
            msg.react("👍🏻").then(() => {
              msg.react("👎🏻");
            });
          });
        }
      });
    } else {
      // console.log("no");
      return;
    }
  }
};
module.exports.messageStatus = messageStatus;

module.exports.sc = sc;
module.exports.config = {
  displayName: "suggestions",
  dbName: "suggestions",
};
