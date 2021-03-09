const AntiSpam = require("discord-anti-spam");
const { spam } = require("../../configs/automod.json");
const { automod_logs } = require("../../configs/logs.json");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../../configs/config.json");
require("events").EventEmitter.defaultMaxListeners = 15;
const ignoredUsers = spam.ignoredMemberId;
const mutedRole = spam.mute_role_name;
const antiSpam = new AntiSpam({
  warnThreshold: 4,
  muteThreshold: 7,
  kickThreshold: 10,
  banThreshold: 15,
  maxInterval: 3000,
  warnMessage: "{@user}, Please stop spamming.",
  kickMessage: "**{user_tag}** has been kicked for spamming.",
  muteMessage: "**{user_tag}** has been muted for spamming.",
  banMessage: "**{user_tag}** has been banned for spamming.",
  maxDuplicatesWarning: 7,
  maxDuplicatesKick: 10,
  maxDuplicatesBan: 12,
  exemptPermissions: [""],
  ignoreBots: true,
  verbose: true,
  ignoredUsers: ignoredUsers,
  muteRoleName: mutedRole,
  removeMessages: true,
});
module.exports = async (client) => {
  client.on("message", (message) => {
    // if (spam.working) {
    // console.log("here");
    antiSpam.message(message);
    // }
  });
  antiSpam.on("warnAdd", (member) => {
    if (automod_logs.working && automod_logs.channel_ID != "channel_id_here") {
      const guild = client.guilds.cache.get(member.guild.id);
      const channel = guild.channels.cache.get(automod_logs.channel_ID);
      const logEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTimestamp()
        .setTitle("Warned")
        .setDescription(`Someone caught spamming`)
        .setAuthor("Automod Log")
        .addFields(
          {
            name: "Spammer:",
            value: `<@${member.user.id}>`,
            inline: true,
          },
          {
            name: "Channel Spammed:",
            value: `<#${member.user.lastMessageChannelID}>`,
            inline: true,
          }
        );
      channel.send(logEmbed);
    }
  });
  antiSpam.on("kickAdd", (member) => {
    if (automod_logs.working && automod_logs.channel_ID != "channel_id_here") {
      const guild = client.guilds.cache.get(member.guild.id);
      const channel = guild.channels.cache.get(automod_logs.channel_ID);
      const logEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTimestamp()
        .setTitle("Kicked")
        .setDescription(`Someone caught spamming`)
        .setAuthor("Automod Log")
        .addFields(
          {
            name: "Spammer:",
            value: `${member.user.username}#${member.user.discriminator}`,
            inline: true,
          },
          {
            name: "Spammer Id:",
            value: `${member.user.id}`,
            inline: true,
          },
          {
            name: "Channel Spammed:",
            value: `<#${member.user.lastMessageChannelID}>`,
          }
        );
      channel.send(logEmbed);
    }
    // console.log(
    //   `${member.user.tag} has been warned in channel <#${member.user.lastMessageChannelID}>`
    // );
  });
  antiSpam.on("muteAdd", (member) => {
    if (automod_logs.working && automod_logs.channel_ID != "channel_id_here") {
      const guild = client.guilds.cache.get(member.guild.id);
      const channel = guild.channels.cache.get(automod_logs.channel_ID);
      console.log(member);
      const logEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTimestamp()
        .setTitle("Muted")
        .setDescription(`Someone caught spamming`)
        .setAuthor("Automod Log")
        .addFields(
          {
            name: "Spammer:",
            value: `<@${member.user.id}>`,
            inline: true,
          },
          {
            name: "Channel Spammed:",
            value: `<#${member.user.lastMessageChannelID}>`,
            inline: true,
          },
          {
            name: "Muted On:",
            value: new Date(),
          }
        );
      channel.send(logEmbed);
    }
  });
  antiSpam.on("banAdd", (member) => {
    if (automod_logs.working && automod_logs.channel_ID != "channel_id_here") {
      const guild = client.guilds.cache.get(member.guild.id);
      const channel = guild.channels.cache.get(automod_logs.channel_ID);
      const logEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTimestamp()
        .setTitle("Banned")
        .setDescription(`Someone caught spamming`)
        .setAuthor("Automod Log")
        .addFields(
          {
            name: "Spammer:",
            value: `${member.user.username}#${member.user.discriminator}`,
            inline: true,
          },
          {
            name: "Spammer Id:",
            value: `${member.user.id}`,
            inline: true,
          },
          {
            name: "Channel Spammed:",
            value: `<#${member.user.lastMessageChannelID}>`,
          }
        );
      channel.send(logEmbed);
    }
    // console.log(
    //   `${member.user.tag} has been warned in channel <#${member.user.lastMessageChannelID}>`
    // );
  });
};
module.exports.config = {
  displayName: "spam",
  dbName: "automod",
};
