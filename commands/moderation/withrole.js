const { MessageEmbed } = require("discord.js");
const { moderation } = require("../../configs/commands.json");
const config = require("../../configs/config.json");

module.exports = {
  name: "withrole",
  commads: ["withrole", "inrole", "wr", "ir"],
  description: "list all members with role",
  requiredPermissions: ["MANAGE_ROLES" || "ADMINISTRATOR "],
  maxArgs: 1,
  category: "moderation",
  cooldown: "5s",
  minArgs: 1,
  expectedArgs: "{PREFIX}withrole <role-id>",
  callback: ({ message, args }) => {
    const serverId = message.guild.id;
    const channelId = message.channel.id;
    let logChannelId;
    let logChannel;
    if (config.moderation.modlogsChannelId) {
      logChannelId = config.moderation.modlogsChannelId;
      logChannel = message.guild.channels.cache.get(logChannelId);
    }

    if (moderation.withrole.working) {
      const roleId = args[0];
      const role = message.guild.roles.cache.get(args[0]);
      if (!role) {
        message.reply(
          `thare is no role with the id, please give a valid role id`
        );
        return;
      }

      let joinMembers;
      if (config.moderation.mobileFriendly) {
        let outputMessageId;
        // console.log("mobile");
        const members = message.guild.roles.cache
          .get(roleId)
          .members.map((m) => m.user.tag);
        const limitedMembers = members.slice(0, 30);

        const joinMembers = limitedMembers.join("\n");
        const withroleEmbed = new MessageEmbed()
          .setAuthor(`Withrole`)
          .setColor(config.embedColor)
          .setTitle(`${members.length} Members with role '${role.name}' `)
          .setDescription(`${joinMembers}`)
          .setFooter(`This Will show top 30 members with the role given`);
        const withroleLogEmbed = new MessageEmbed()
          .setAuthor(`Withrole Log`)
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
          .send(withroleEmbed)
          .then((msg) => {
            // console.log(msg.id);
            outputMessageId = msg.id;
          })
          .then(logChannel.send(withroleLogEmbed));

        return;
      }
      const members = message.guild.roles.cache
        .get(roleId)
        .members.map((m) => m.user.id);
      const limitedMembers = members.slice(0, 30);

      joinMembers = limitedMembers.join(">\n<@");
      const withroleEmbed = new MessageEmbed()
        .setAuthor(`Withrole`)
        .setColor(config.embedColor)
        .setTitle(`${members.length} Members with role '${role.name}' `)
        .setDescription(`<@${joinMembers}>`)
        .setFooter(`This Will show top 30 members with the role given`);
      let outputMessageId;

      const withroleLogEmbed = new MessageEmbed()
        .setAuthor(`Withrole Log`)
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
          }
        )
        .setTimestamp();

      message.channel
        .send(withroleEmbed)
        .then((msg) => {
          // console.log(msg.id);
          outputMessageId = msg.id;
        })
        .then(logChannel.send(withroleLogEmbed));
    }
  },
};
