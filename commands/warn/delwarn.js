const warnSchema = require("./../../models/warnSchema");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "delwarn",
  commands: ["dw"],
  aliases: ["w"],
  description: "Warn a User",
  //   minArgs: 2,
  category: "warn",
  cooldown: "3s",
  requiredPermissions: ["MANAGE_GUILD"],
  expectedArgs: "I <@ user-id> <reason>",
  callback: async ({ message, args }) => {
    // const user = message.mentions.users.first();
    // const userId = user.id;
    const guildId = message.guild.id;
    const warnId = args[0];
    const results = await warnSchema.findOneAndUpdate(
      {
        guildId,
        "warnings.id": warnId,
      },
      {
        $pull: {
          warnings: { id: warnId },
        },
      }
    );
    // console.log(results);
    if (results) {
      console.log(results);
      const deletedWarnSuccessfullyEmbed = new MessageEmbed()
        .setAuthor("Deleted Warn")
        .setDescription("Successfully Deleted Warn!");
      message.channel.send(deletedWarnSuccessfullyEmbed);
    }
  },
};
