const config = require("../../configs/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "purge",
  commads: ["purge"],
  aliases: ["del"],
  description: "Bulk delete messages",
  requiredPermissions: ["MANAGE_MESSAGES"],
  category: "moderation",
  cooldown: "5s",
  maxArgs: 2,
  callback: async ({ message, args }) => {
    const noOfMessages = parseInt(args[0]);
    const prefix = config.prefix;
    if (!args[0]) {
      const pHelpEmbed = new MessageEmbed()
        .setAuthor(`Purge Help`)
        .setDescription(`You Can Use This commands in two different Ways.`)
        .addFields(
          {
            name: `Usage:`,
            value: `${prefix}purge [no. of messages] => You can use in specfic channel to delete Messages.
             ${prefix}purge [no. of messsages] [channel Id] => you can you in any channel and delete message sin a specfied channel with its ID.`,
          },
          {
            name: `Example`,
            value: `
             ${prefix}purge 5
             ${prefix}purge 5 774676623608905772`,
          }
        )
        .setColor(config.embedColor);
      message.channel.send(pHelpEmbed);
      return;
    }
    if (!noOfMessages) {
      message.reply("Please Enter a valid number to delete messages");
      return;
    }
    if (noOfMessages > 99) {
      message.reply(`You Can Delete less that 100 messages only.`);
      return;
    }
    if (args[1]) {
      const channelId = args[1];
      if (!channelId) {
        message.reply(`Please enter A Valid Channel ID`);
        return;
      }
      const channel = message.guild.channels.cache.get(channelId);
      if (!channel) {
        message.reply(
          "cannot find Channel With Provided ID, Please Check channel Id and Then Try again."
        );
        return;
      }
      channel.bulkDelete(noOfMessages).then((messages) => {
        message.delete();
        message.channel.send(
          `Deleted ${messages.size} Messages in <#${channelId}>, This Message Won't be deleted automatically.`
        );
      });
      return;
    }
    message.channel.bulkDelete(noOfMessages).then((messages) => {
      message.channel.send(
        `Deleted ${messages.size} Messages in This channel,This Message Won't be deleted automatically.`
      );
    });
  },
};
