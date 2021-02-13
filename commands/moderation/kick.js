const { moderation } = require("../../configs/commands.json");
const config = require("../../configs/config.json");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "kick",
  commands: ["kick"],
  description: "kick a User",
  requiredPermissions: ["KICK_MEMBERS"],
  category: "moderation",
  cooldown: "5s",
  maxArgs: -1,
  minArgs: 1,
  expectedArgs: "<@ user-id> <reason(optional)>",
  callback: ({ message, args }) => {
    const serverId = message.guild.id;
    const channelId = message.channel.id;
    let logChannelId;
    let logChannel;
    if (config.moderation.modlogsChannelId) {
      logChannelId = config.moderation.modlogsChannelId;
      logChannel = message.guild.channels.cache.get(logChannelId);
    }
    let outputMessageId;

    if (moderation.kick.working) {
      //   console.log(args);
      const target = message.mentions.users.first();
      if (!target) {
        message.reply(`please mention a user to ban`);
      }
      args.shift();
      const reason = args.join(" ");
      const member = message.guild.members.cache.get(target.id);
      if (target.id === message.author.id) {
        message.reply(`you cannor ban yourself`);
        return;
      }
      if (!member.kickable) {
        message.reply(`Cannot ban user above my role!`);
        return;
      }
      if (!reason) {
        member.kick();
        if (config.moderation.mobileFriendly) {
          const noReasonKickLogembed = new MessageEmbed()
            .setAuthor(`Kick Log (No Reason)`)
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
              }
            )
            .setTimestamp()
            .setFooter(`Mobile Friendly`);
          message.channel
            .send(`Kicked The User`)
            .then((msg) => {
              // console.log(msg.id);

              outputMessageId = msg.id;
            })
            .then(logChannel.send(noReasonKickLogembed));
          return;
        }
        const noReasonKickLogembed = new MessageEmbed()
          .setAuthor(`Kick Log (No Reason)`)
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
            }
          )
          .setTimestamp();
        message.channel
          .send(`Kicked The User`)
          .then((msg) => {
            // console.log(msg.id);

            outputMessageId = msg.id;
          })
          .then(logChannel.send(noReasonKickLogembed));
        return;
      }
      member.kick(reason);
      if (config.moderation.mobileFriendly) {
        const noReasonKickLogembed = new MessageEmbed()
          .setAuthor(`Kick Log (Reason)`)
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
            }
          )
          .setTimestamp()
          .setFooter(`Mobile Friendly`);
        message.channel
          .send(`Kicked The User`)
          .then((msg) => {
            // console.log(msg.id);

            outputMessageId = msg.id;
          })
          .then(logChannel.send(noReasonKickLogembed));
        return;
      }
      const noReasonKickLogembed = new MessageEmbed()
        .setAuthor(`Kick Log (Reason)`)
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
            name: `Reason:`,
            value: reason,
          }
        )
        .setTimestamp();
      message.channel
        .send(`Kicked The User `)
        .then((msg) => {
          // console.log(msg.id);

          outputMessageId = msg.id;
        })
        .then(logChannel.send(noReasonKickLogembed));
      return;
    }
  },
};
//+ban @ days reason
