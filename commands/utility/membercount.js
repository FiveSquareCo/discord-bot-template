const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");

module.exports = {
  name: "membercount",
  commads: ["membercount"],
  aliases: ["mc", "mcount", "stats"],
  description: "no of members",
  callback: (message, args) => {
    const totalMembers = message.guild.members.cache.filter(
      (member) => !member.user.bot
    ).size;
    const onlineMembers = message.guild.members.cache.filter(
      (member) => member.presence.status == "online"
    ).size;
    const offlineMembers = message.guild.members.cache.filter(
      (member) => member.presence.status == "offline"
    ).size;
    const idleMembers = message.guild.members.cache.filter(
      (member) => member.presence.status == "idle"
    ).size;
    const dndMembers = message.guild.members.cache.filter(
      (member) => member.presence.status == "dnd"
    ).size;
    const bots = message.guild.members.cache.filter((member) => member.user.bot)
      .size;

    const statsEmbed = new MessageEmbed()
      .setTitle(`Server Stats of ${message.guild.name}`)
      .setColor(config.embedColor)
      .setDescription(
        `**->**  **Total Members(Humans): **${totalMembers}

       **->** **Bots: ** ${bots}

      **->** **Members Online: ** ${onlineMembers}

       **->** **Members Offline: ** ${offlineMembers}

      **->** **Idle Members: ** ${idleMembers}

      **->** **Dnd Members:** ${dndMembers}`
      )
      .setTimestamp()
      .setFooter(`Server Stats As of`);
    message.channel.send(statsEmbed);
  },
};
