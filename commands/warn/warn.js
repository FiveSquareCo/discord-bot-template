const warnSchema = require("./../../models/warnSchema");
const config = require("./../../configs/config.json");
const { moderation } = require("./../../configs/commands");
const { MessageEmbed } = require("discord.js");
const warnId = require("randomstring");
module.exports = {
  name: "warn",
  commands: ["warn"],
  aliases: ["w"],
  description: "Warn a User",
  minArgs: 2,
  category: "warn",
  cooldown: "3s",
  requiredPermissions: ["MANAGE_GUILD"],
  expectedArgs: "I <@ user-id> <reason>",
  callback: async ({ message, args }) => {
    if (moderation.warn.working) {
      const serverId = message.guild.id;
      const channelId = message.channel.id;
      let logChannelId;
      let logChannel;
      if (config.moderation.modlogsChannelId) {
        logChannelId = config.moderation.modlogsChannelId;
        logChannel = message.guild.channels.cache.get(logChannelId);
      }
      let outputMessageId;
      const { author } = message;
      const target = message.mentions.users.first();
      if (!target) {
        message.reply("please mention someone to warn");
        return;
      }
      if (target.id === author.id) {
        message.reply(`You cannot warn yourself`);
        return;
      }

      args.shift();
      const guildId = message.guild.id;
      const userId = target.id;
      const reason = args.join(" ");
      // console.log(guildId, userId, reason);
      const warning = {
        id: warnId.generate(),
        givenById: message.author.id,
        givenByName: message.member.user.tag,
        timestamp: new Date().getTime(),
        reason,
      };
      await warnSchema
        .findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          }
        )
        .catch((err) => {
          if (err) return message.reply(`There was an error!Please try again.`);
        });
      // console.log("RESULTS:", results);
      const warnEmbed = new MessageEmbed()
        .setAuthor(`Warn`)
        .setColor(config.embedColor)
        .setFooter(`Success`)
        .setTimestamp()
        .setDescription(`Successfully Warned **${target.username}**,
          To Check Warns Use: '${config.prefix}warnings <@user-id>'`);

      if (config.moderation.mobileFriendly) {
        const banLogEmbed = new MessageEmbed()
          .setAuthor(`Warn Log`)
          .setColor(config.embedColor)
          .setDescription(`Message Content: ${message.content}`)
          .addFields(
            {
              name: `Used by:`,
              value: message.author.tag,
              inline: true,
            },
            {
              name: `Channel used:(channel name)`,
              value: message.channel.name,
              inline: true,
            },
            {
              name: `Output:`,
              value: `Output message Link: [Click Here](https://discordapp.com/channels/${serverId}/${channelId}/${outputMessageId}) `,
              // inline: true,
            },
            {
              name: `Reason`,
              value: reason,
              inline: true,
            },
            {
              name: `Warned`,
              value: target.tag,
            }
          )
          .setTimestamp()
          .setFooter(`Mobile Friendly`);

        await message.channel
          .send(warnEmbed)
          .then((msg) => {
            outputMessageId = msg.id;
          })
          .then(logChannel.send(banLogEmbed));
        return;
      }
      const banLogEmbed = new MessageEmbed()
        .setAuthor(`Warn Log`)
        .setColor(config.embedColor)
        .setDescription(`Message Content: ${message.content}`)
        .addFields(
          {
            name: `Used by:`,
            value: `<@${message.author.id}>`,
            inline: true,
          },
          {
            name: `Channel used:`,
            value: `<#${message.channel.id}>`,
            inline: true,
          },
          {
            name: `Output:`,
            value: `Output message Link: [Click Here](https://discordapp.com/channels/${serverId}/${channelId}/${outputMessageId}) `,
            // inline: true,
          },
          {
            name: `Reason`,
            value: reason,
            inline: true,
          },
          {
            name: `Warned`,
            value: `<@${target.id}>`,
          }
        )
        .setTimestamp()
        .setFooter(`Mobile Friendly`);

      await message.channel
        .send(warnEmbed)
        .then((msg) => {
          outputMessageId = msg.id;
        })
        .then(logChannel.send(banLogEmbed));
      return;
    }
  },
};
