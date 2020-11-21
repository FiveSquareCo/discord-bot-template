const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
const { moderation } = require("@config/commands.json");
module.exports = {
  name: "unban",
  commands: ["unban", "revokban", "ub"],
  requiredPermissions: ["BAN_MEMBERS"],
  minArgs: 2,
  maxArgs: -1,
  description: "unban a banned user",
  syntaxError: "Incorrect syntax! Use `{PREFIX}unban <user-id> <reason>`",
  callback: async (message, args) => {
    const serverId = message.guild.id;
    const channelId = message.channel.id;
    let logChannelId;
    let logChannel;
    if (config.moderation.modlogsChannelId) {
      logChannelId = config.moderation.modlogsChannelId;
      logChannel = message.guild.channels.cache.get(logChannelId);
    }
    let outputMessageId;
    // let username;
    if (moderation.ban.working) {
      const { guild } = message;
      const member = args[0];
      args.shift();
      const reason = args.join(" ");
      // console.log("MEMBER:", member);
      // console.log("REASON:", reason);
      guild.members
        .unban(member, reason)
        .then((user) => {
          message
            .reply(`Unbanned **${user.username}** from ${guild.name}`)
            .then((msg) => {
              outputMessageId = msg.id;
            });
        })

        .catch(console.error);
      if (config.moderation.mobileFriendly) {
        const unbanLogEmbed = new MessageEmbed()
          .setColor(config.embedColor)
          .setAuthor(`Unban Log`)
          .setFooter(`Mobile Friendly`)
          .setTimestamp()
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
            }
          );
        logChannel.send(unbanLogEmbed);
        return;
      }
      const unbanLogEmbed = new MessageEmbed()
        .setColor(config.embedColor)
        .setAuthor(`Unban Log`)
        .setTimestamp()
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
            name: `Reason`,
            value: reason,
            inline: true,
          }
        );
      logChannel.send(unbanLogEmbed);
      return;
      // console.log(username);
    }
  },
};
