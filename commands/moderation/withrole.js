const { moderation } = require("../../configs/commands.json");
const config = require("../../configs/config.json");
const pagenation = require("discord.js-pagination");
const discord = require("discord.js");

module.exports = {
  name: "withrole",
  commads: ["withrole", "inrole", "wr", "ir"],
  description: "list all members with role",
  requiredPermissions: ["MANAGE_ROLES" || "ADMINISTRATOR "],
  maxArgs: 1,
  category: "moderation",
  cooldown: "5s",
  minArgs: 1,
  callback: async ({ message, args }) => {
    const serverId = message.guild.id;
    const channelId = message.channel.id;
    let logChannelId;
    let logChannel;
    if (config.moderation.modlogsChannelId != "channel_id_here") {
      logChannelId = config.moderation.modlogsChannelId;
      logChannel = message.guild.channels.cache.get(logChannelId);
    }

    if (moderation.withrole.working) {
      let roleId;
      const role = message.mentions.roles.first();
      if (role) {
        roleId = role.id;
      } else if (role === undefined) {
        roleId = args[0];
      }
      const roleInfo = message.guild.roles.cache.get(roleId);
      if (!roleInfo) {
        return message.reply(
          "There is no role with the id, please give a valid role id"
        );
      }
      const members = roleInfo.members.map((m) => m.user.id);
      let memsLen = members.length;

      if (memsLen < 20) {
        const Data = members.join(">\n<@");
        const embed = new discord.MessageEmbed()
          .setAuthor("With Role")
          .setTitle(`${members.length} users with role ***${roleInfo.name}***`)
          .setColor(config.embedColor)
          .setDescription(`<@${Data}>`);

        const withRoleLogEmbed = new discord.MessageEmbed()
          .setAuthor(`With Role`)
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
              name: "Role ID:",
              value: roleId,
            }
          )
          .setTimestamp();
        await logChannel.send(withRoleLogEmbed);
        return message.channel.send(embed);
      }
      const n = 20;
      const result = new Array(Math.ceil(members.length / n))
        .fill()
        //eslint-disable-next-line
        .map((_) => members.splice(0, n));
      // console.log(result);
      let pages = [];
      let i;
      for (i = 0; i < result.length; i++) {
        const embed = new discord.MessageEmbed()
          .setAuthor("With Role")
          .setColor(config.embedColor)
          .setDescription(`<@${result[i].join(">\n<@")}>`);
        pages.push(embed);
      }
      pages.forEach((page) => {
        page.setTitle(`${memsLen} users with role ***${roleInfo.name}***`);
      });
      // console.log(pages);
      const emojiList = ["◀️", "▶️"];
      const timeout = 120000;

      const withRoleLogEmbed = new discord.MessageEmbed()
        .setAuthor(`With Role`)
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
            name: "Role ID:",
            value: roleId,
          }
        )
        .setTimestamp();
      await logChannel.send(withRoleLogEmbed);
      await pagenation(message, pages, emojiList, timeout);
    }
  },
};
