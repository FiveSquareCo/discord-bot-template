const warnSchema = require("@schema/warnSchema");
const config = require("@config/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "resetwarns",
  commands: ["resetwarns", "remwarns"],
  description: "reset warnings of user",
  minArgs: 1,
  maxArgs: 1,
  category: "warn",
  cooldown: "3s",
  requiredPermissions: ["ADMINISTRATOR"],
  expectedArgs: "<@ user-id>",
  callback: async (message, args, text, client) => {
    if (args[0] === "all") {
      let outputMessageId;
      const { guild, channel, author } = message;
      message.delete();
      const resetRankEmbed = new MessageEmbed()
        .setAuthor(`Reset Rank`)
        .setFooter(`React Below to continue the process`)
        .setDescription(
          `This process deletes the data permanantly, you cannot undo the process.\n
      - React to ' ▶️ ' to Continue The Process
      - React to ' 🛑 ' to Stop The Process.\n
      The reactions will count only if ${author.username} react.`
        )
        .setTimestamp()
        .setColor(config.embedColor)
        .setTitle(`⚠️ Warning ⚠️`);
      channel.send(resetRankEmbed).then((msg) => {
        outputMessageId = msg.id;
        msg.react("▶️");
        msg.react("🛑");
      });
      client.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        //   console.log(reaction, user);
        if (reaction.message.channel.id === channel.id) {
          if (user.id === author.id) {
            if (reaction.emoji.name === "▶️") {
              await warnSchema.deleteMany({ guildId: guild.id }, (err, res) => {
                //   console.log("RESULTS:", res);
                const { deletedCount } = res;
                //   console.log(deletedCount);
                if (err) {
                  channel.messages.fetch(outputMessageId).then((outM) => {
                    //   console.log(outM);
                    outM.delete();
                  });
                  message.reply(`There was an error! please try again`);
                  return;
                }
                if (!res) {
                  channel.messages.fetch(outputMessageId).then((outM) => {
                    //   console.log(outM);
                    outM.delete();
                  });
                  message.reply(`There were no data to delete!`);
                  return;
                }
                if (deletedCount != 0) {
                  channel.messages.fetch(outputMessageId).then((outM) => {
                    //   console.log(outM);
                    outM.delete();
                  });
                  message.reply(`deleted ranks of ${deletedCount} members!`);
                  return;
                } else {
                  channel.messages.fetch(outputMessageId).then((outM) => {
                    //   console.log(outM);
                    outM.delete();
                  });
                  message.reply(`There were no data to delete!`);
                  return;
                }
              });
            } else if (reaction.emoji.name === "🛑") {
              channel.messages.fetch(outputMessageId).then((outM) => {
                //   console.log(outM);
                outM.delete();
              });

              message.reply(`Aborting The Process of Rank Reset!`);
              return;
            }
          } else return;
          // console.log(user);
        } else return;
      });
    } else {
      const target = message.mentions.users.first();
      if (!target) return message.reply(`please mention someone or use all`);
      message.reply("This Command under develpment");
    }
  },
};
