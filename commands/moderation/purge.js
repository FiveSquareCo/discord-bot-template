const config = require("../../configs/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "purge",
  commads: ["purge"],
  aliases: ["del"],
  description: "Bulk delete messages",
  requiredPermissions: ["MANAGE_MESSAGES"],
  category: "moderation",
  cooldown: "3s",
  maxArgs: 2,
  callback: async ({ message, args }) => {
    const { guild, channel, author } = message;
    if (!args[0]) {
      message.reply("Please Provide some message to Delete!");
      return;
    }
    const noOfMessage = args[0];
    const messages = channel.fetchMessages({ limit: noOfMessage });
    await channel.bulkDelete(messages);
  },
};
