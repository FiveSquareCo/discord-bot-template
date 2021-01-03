const { MessageEmbed } = require("discord.js");
const afkSchema = require("@schema/afkSchema");
const { misc } = require("@config/commands.json");
const config = require("@config/config.json");

module.exports = {
  name: "setafk",
  commads: ["setafk", "afkset"],
  category: "afk",
  description: "set a user AFK",
  maxArgs: -1,
  minArgs: 1,
  expectedArgs: "<reason>",
  callback: async (message, args) => {
    if (misc.afk.working) {
      const { author, guild } = message;

      const userId = author.id;
      const guildId = guild.id;
      const member = guild.members.cache.get(userId);
      const reason = args.join(" ");
      // console.log(author.id, guild.id, reason);
      const result = await afkSchema.findOneAndUpdate(
        {
          userId,
          guildId,
        },
        { userId, guildId, reason },
        {
          upsert: true,
          new: true,
        }
      );
      // console.log(result);
      if (!result) {
        message.reply("There was a error! please try again");
        return;
      }
      const setAfkEmbed = new MessageEmbed()
        .setAuthor(`Set AFK`)
        .setColor(config.embedColor)
        .setDescription(
          `
     ${author.username},I added you to afk list!\n
     **Reason:** ${reason}  \n
    when you come back onlne use "${config.prefix}removeafk" to remove you from AFK list.
    `
        )
        .setFooter(`Set you afk`)
        .setTimestamp();
      await message.channel.send(setAfkEmbed);
      // await console.log(member);
      const changeNickname = async (member) => {
        if (!member.nickname) {
          const name = member.user.username;
          try {
            await member.setNickname(`[AFK] ${name}`);
          } catch (err) {}

          return;
        }
        if (member.nickname) {
          const nickname = member.nickname;
          try {
            await member.setNickname(`[AFK] ${nickname}`);
          } catch (err) {}

          return;
        }
      };
      await changeNickname(member);
    }
  },
};

// +setafk Reason
