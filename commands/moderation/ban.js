const { moderation } = require("@config/commands.json");
const config = require("@config/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ban",
  commands: ["ban"],
  description: "ban a User",
  minArgs: 3,
  maxArgs: -1,
  requiredPermissions: ["ADMINISTRATOR" || "BAN_MEMBERS"],
  syntaxError:
    "Incorrect syntax! Use `{PREFIX}ban <@ user-id> <time in days> <reason>`",
  callback: (message, args) => {
    const serverId = message.guild.id;
    const channelId = message.channel.id;
    let logChannelId;
    let logChannel;
    if (config.moderation.modlogsChannelId) {
      logChannelId = config.moderation.modlogsChannelId;
      logChannel = message.guild.channels.cache.get(logChannelId);
    }
    let outputMessageId;
    if (moderation.ban.working) {
      //   console.log(args);
      const target = message.mentions.users.first();
      if (!target) {
        message.reply(`please mention a user to ban`);
      }
      args.shift();
      //   console.log(args);
      const time = parseInt(args[0]);
      args.shift();
      const reason = args.join(" ");
      const member = message.guild.members.cache.get(target.id);
      if (target.id === message.author.id) {
        message.reply(`you cannor ban yourself`);
        return;
      }
      if (!member.bannable) {
        message.reply(`Cannot ban user above my role!`);
        return;
      }
      member.ban({ days: time, reason: reason });
      if (config.moderation.mobileFriendly) {
        const banLogEmbed = new MessageEmbed()
          .setAuthor(`Ban Log`)
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
              name: `Time`,
              value: time,
              inline: true,
            },
            {
              name: `Reason`,
              value: reason,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter(`Mobile Friendly`);
        message.channel
          .send(`Banned The User for ${time} days.`)
          .then((msg) => {
            // console.log(msg.id);

            outputMessageId = msg.id;
          })
          .then(logChannel.send(banLogEmbed));
        return;
      }
      const banLogEmbed = new MessageEmbed()
        .setAuthor(`Ban Log`)
        .setColor(config.embedColor)
        .setDescription(`Message Content: ${message.content}`)
        .addFields(
          {
            name: `Used by:`,
            value: `<@${message.author.id}>`,
            inline: true,
          },
          {
            name: `Channel used:(channel name)`,
            value: `<#${message.channel.id}>`,
            inline: true,
          },
          {
            name: `Output:`,
            value: `Output message Link: [Click Here](https://discordapp.com/channels/${serverId}/${channelId}/${outputMessageId}) `,
            // inline: true,
          },
          {
            name: `Time`,
            value: time,
            inline: true,
          },
          {
            name: `Reason`,
            value: reason,
            inline: true,
          }
        )
        .setTimestamp();

      message.channel
        .send(`Banned The User for ${time} days.`)
        .then((msg) => {
          // console.log(msg.id);

          outputMessageId = msg.id;
        })
        .then(logChannel.send(banLogEmbed));
      return;
    }
  },
};
//+ban @ days reason
