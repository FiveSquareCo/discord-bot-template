const { messageStatus } = require("../../events/suggestions");
const { suggestions } = require("../../configs/features.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "suggestions",
  commands: ["suggestions"],
  description: "accept or deny suggestion",
  requiredPermissions: ["ADMINISTRATOR"],
  maxArgs: -1,
  category: "suggestions",
  minArgs: 2,
  expectedArgs: "<suggestion message ID> <status - Accepted/Denied> <reason>",
  callback: async ({ message, args }) => {
    const { author, guild } = message;
    const messageId = args.shift();
    const status = args.shift().toUpperCase();
    const reason = args.join(" ");
    message.delete();
    const newStatus = messageStatus[status];
    if (suggestions.working) {
      if (suggestions.suggestionsChannelId != "channel_id_here") {
        if (!newStatus) {
          message.reply("Wrong Staus, please use 'Accepted' or 'Denied'");
          return;
        }
        const channel = guild.channels.cache.get(
          suggestions.suggestionsChannelId
        );
        if (!channel) {
          message.reply(
            "cannot find any suggestions channel! please try again."
          );
          return;
        }
        const targetMessage = await channel.messages.fetch(
          messageId,
          false,
          true
        );
        if (!targetMessage) {
          message.reply("specfied message I no longer exits");
          return;
        }
        const oldEmbed = targetMessage.embeds[0];
        // console.log(oldEmbed);
        const embed = new MessageEmbed()
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
          .setDescription(oldEmbed.description)
          .setColor(newStatus.color)
          .setFooter(`Want to suggest something? just type in this channel`)
          .addFields(
            {
              name: "*Status*",
              value: `${newStatus.text}
              `,
            },
            {
              name: "Reason :",
              value: `${reason}
              **Replied by :** ${author.username}#${author.discriminator}`,
            }
          );
        targetMessage.edit(embed);
        await message
          .reply(`replied for suggestion!`)
          .then((msg) => msg.delete({ timeout: 3000 }));
      }
    }
  },
};
