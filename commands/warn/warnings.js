const warnSchema = require("@schema/warnSchema");
const config = require("@config/config.json");
const { moderation } = require("@config/commands");
const { MessageEmbed } = require("discord.js");
const ban = require("../moderation/ban");
module.exports = {
  name: "warnings",
  commands: ["warnings", "listwarn", "lw"],
  description: "list all Warnings of a User",
  minArgs: 1,
  syntaxError: "Incorrect syntax! Use `{PREFIX}warnings <@ user-id>`",
  callback: async (message, args) => {
    const { author } = message;
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
      const target = message.mentions.users.first();
      if (!target) {
        message.reply("please mention someone to get warnings of");
        return;
      }

      const guildId = message.guild.id;
      const userId = target.id;
      const targetProfile = target.displayAvatarURL({ dynamic: true });

      const results = await warnSchema.findOne({
        guildId,
        userId,
      });
      if (!results) {
        message.reply(
          "No Warns For Mentioned user, Use:`+warn <@ user-id> <reason>` to warn"
        );
        return;
      }
      const noOfWarns = results.warnings.length;
      let warnNum = 1;

      if (config.moderation.mobileFriendly) {
        let reply = `**${noOfWarns} Warns for ${target.tag}**\n\n`;
        for (const warning of results.warnings) {
          //   console.log(results.warnings.length);
          const { givenById, givenByName, timestamp, reason } = warning;
          reply += `${warnNum}) **On  :**  ${new Date(
            timestamp
          ).toDateString()} | **Warned By  :**  ${givenByName} 
       **Reason  :**  '${reason}'\n\n`;
          warnNum++;
        }
        const warningsEmbed = new MessageEmbed()
          .setAuthor(`Warnings`)
          .setColor(`${config.embedColor}`)
          .setDescription(reply)
          .setThumbnail(targetProfile)
          .setFooter(`Req. By ${author.tag} | Mobile Friendly`)
          .setTimestamp();
        const banLogEmbed = new MessageEmbed()
          .setAuthor(`Warnings Log`)
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
          .send(warningsEmbed)
          .then((msg) => {
            outputMessageId = msg.id;
          })
          .then(logChannel.send(banLogEmbed));
        return;
      }
      let reply = `**${noOfWarns} Warns for <@${userId}>**\n\n`;
      for (const warning of results.warnings) {
        //   console.log(results.warnings.length);
        const { givenById, givenByName, timestamp, reason } = warning;
        reply += `${warnNum}) **On  :**  ${new Date(
          timestamp
        ).toDateString()} | **Warned By  :** <@${givenById}> 
       **Reason  :**  '${reason}'\n\n`;
        warnNum++;
      }
      const warningsEmbed = new MessageEmbed()
        .setAuthor(`Warnings`)
        .setColor(`${config.embedColor}`)
        .setDescription(reply)
        .setThumbnail(targetProfile)
        .setFooter(`Req. By ${author.tag}`)
        .setTimestamp();
      const banLogEmbed = new MessageEmbed()
        .setAuthor(`Warnings Log`)
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
        .send(warningsEmbed)
        .then((msg) => {
          outputMessageId = msg.id;
        })
        .then(logChannel.send(banLogEmbed));
      return;
    }
  },
};
