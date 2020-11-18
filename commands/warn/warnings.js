const warnSchema = require("../../models/warnSchema");
const config = require("../../configs/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "warnings",
  commands: ["warnings", "listwarn"],
  aliases: ["lw"],
  description: "list all Warnings of a User",
  minArgs: 1,
  syntaxError: "Incorrect syntax! Use `{PREFIX}warnings <@ user-id>`",
  callback: async (message, args) => {
    const target = message.mentions.users.first();
    if (!target) {
      message.reply("please mention someone to get warnings of");
      return;
    }

    const guildId = message.guild.id;
    const userId = target.id;
    const targetProfile = target.displayAvatarURL({ dynamic: true });

    const results = await warnSchema.findOne({
      guildId,
      userId,
    });
    if (!results) {
      message.reply(
        "No Warns For Mentioned user, Use:`+warn <@ user-id> <reason>` to warn"
      );
      return;
    }
    const noOfWarns = results.warnings.length;
    let warnNum = 1;
    let reply = `**${noOfWarns} Warns for <@${userId}>**\n\n`;
    for (const warning of results.warnings) {
      //   console.log(results.warnings.length);
      const { givenById, givenByName, timestamp, reason } = warning;
      reply += `${warnNum}. on ${new Date(
        timestamp
      ).toDateString()}  Warned By : <@${givenById}> 
       **Reason:** "${reason}"\n\n`;
      warnNum++;
    }
    const warningsEmbed = new MessageEmbed()
      .setAuthor(`Warnings`)
      .setColor(`${config.embedColor}`)
      .setDescription(reply)
      .setThumbnail(targetProfile);
    message.channel.send(warningsEmbed);
  },
};
