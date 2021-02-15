const levelSchema = require("../../models/levelSchema");
const { MessageEmbed } = require("discord.js");
const { levelRewards } = require("../../configs/levels.json");
const config = require("../../configs/config.json");
module.exports = {
  name: "resetrank",
  commands: ["resetrank", "rankreset", "rr"],
  description: "reset ranks",
  category: "leveling",
  requiredPermissions: ["ADMINISTRATOR"],
  callback: async ({ message, args, text, client }) => {
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
            await levelSchema.deleteMany({ guildId: guild.id }, (err, res) => {
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
                if (
                  levelRewards.working &&
                  levelRewards.rewards["level-1"] != "reward_role_id"
                ) {
                  const members = guild.members.cache.forEach((member) => {
                    const role1 = levelRewards.rewards["level-1"];
                    const role2 = levelRewards.rewards["level-5"];
                    const role3 = levelRewards.rewards["level-15"];
                    const role4 = levelRewards.rewards["level-25"];
                    const role5 = levelRewards.rewards["level-35"];
                    const role6 = levelRewards.rewards["level-45"];
                    const role7 = levelRewards.rewards["level-55"];
                    const role8 = levelRewards.rewards["level-70"];
                    if (
                      role1 &&
                      role2 &&
                      role3 &&
                      role4 &&
                      role5 &&
                      role6 &&
                      role7 &&
                      role8
                    ) {
                      member.roles.remove(role1);
                      member.roles.remove(role2);
                      member.roles.remove(role3);
                      member.roles.remove(role4);
                      member.roles.remove(role5);
                      member.roles.remove(role6);
                      member.roles.remove(role7);
                      member.roles.remove(role8);
                    }
                  });
                }
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
  },
};
