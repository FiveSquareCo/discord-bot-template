const levelSchema = require("../../models/levelSchema");
const Discord = require("discord.js");
const canvacord = require("canvacord");
const { embedColor } = require("../../configs/config.json");
const { levelCommandMessage } = require("../../configs/levels.json");
const { join } = require("path");
module.exports = {
  name: "level",
  commands: ["level", "myrank", "rank", "lvl"],
  category: "leveling",
  description: "Level of a User",
  callback: async ({ message }) => {
    const author = message.author;
    const guildId = message.guild.id;
    const userId = message.member.id;
    const image = join(__dirname, "..", "..", "images", "welcomeBG.png");

    // console.log(image);

    await levelSchema.findOne({ guildId, userId }, async (err, result) => {
      if (!result) {
        message.reply(
          `You Dont have Any Level, First Send Some Mesages then Check Back!`
        );
        return;
      }
      const { xp, level } = result;
      const results = await levelSchema
        .find({
          guildId,
        })
        .sort({
          level: -1,
          xp: -1,
        });
      let userRank;
      for (var i = 0; i < results.length; i++) {
        if (results[i].userId === userId) {
          userRank = i + 1;
        }
      }
      if (levelCommandMessage.toLocaleLowerCase() === "embed") {
        const name = `${author.username}#${author.discriminator}`;
        const levelEmbed = new Discord.MessageEmbed()
          .setAuthor(name, author.displayAvatarURL({ dynamic: true }))
          .setTitle("Level/Rank")
          .setThumbnail(author.displayAvatarURL({ dynamic: true }))
          .setDescription(
            `
  :dizzy: Exp : ${xp}
  :trophy: level : ${level}
  :bar_chart: Rank : ${userRank}
  `
          )
          .setColor(embedColor)
          .setFooter(message.guild.name)
          .setTimestamp();
        message.channel.send(levelEmbed);
      }
      //   message.reply(` Your Level is ${level} , and you have ${xp} xp`);
      if (levelCommandMessage.toLocaleLowerCase() === "card") {
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
          .setRank(userRank, "", true);

        rank.build().then((data) => {
          const attachment = new Discord.MessageAttachment(
            data,
            "RankCard.png"
          );
          message.channel.send(attachment);
        });
        return;
      }
    });
  },
};
