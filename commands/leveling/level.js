const levelSchema = require("@schema/levelSchema");
const Discord = require("discord.js");
const canvacord = require("canvacord");
const { join } = require("path");
module.exports = {
  name: "level",
  commands: ["level"],
  aliases: ["l", "lvl"],
  description: "Level of a User",
  callback: async (message) => {
    const guildId = message.guild.id;
    const userId = message.member.id;
    const image = join(__dirname, "..", "..", "images", "welcomeBG.png");
    // console.log(image);

    await levelSchema.findOne({ guildId, userId }, (err, result) => {
      if (!result) {
        message.reply(
          `You Dont have Any Level, First Send Some Mesages then Check Back!`
        );
        return;
      }
      const { xp, level } = result;
      //   message.reply(` Your Level is ${level} , and you have ${xp} xp`);
      const rank = new canvacord.Rank()
        .setAvatar(
          message.author.displayAvatarURL({ dynamic: false, format: "png" })
        )
        .setCurrentXP(xp)
        .setRequiredXP(level * level * 100)
        .setStatus(message.author.presence.status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        .setLevel(level)
        .renderEmojis(true)
        // .setOverlay("#00ffff", 0.9)
        // .setBackground("IMAGE", image)
        .setRank(1, "", false);

      rank.build().then((data) => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
      });
    });
  },
};
