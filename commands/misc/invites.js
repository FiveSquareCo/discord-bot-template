const { MessageEmbed, MessageMentions } = require("discord.js");
const { embedColor } = require("../../configs/config.json");
const { misc } = require("../../configs/commands.json");
module.exports = {
  name: "invites",
  category: "misc",
  commands: ["invites"],
  description: "Gives user's invites",
  callback: async ({ message, args, text, client, prefix, instance }) => {
    if (misc.invites.working) {
      message.reply("Under Construction!!");
    }
  },
};
