const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
const { info } = require("@config/commands.json");
module.exports = {
  name: "serverinfo",
  category: "info",
  commands: ["serverinfo", "si", "infoserver", "gi"],
  description: "information about server",
  callback: async ({ message }) => {
    if (info.serverinfo.working) {
      const capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
      };
      const { guild, author } = message;
      const noOfTextChannels = guild.channels.cache.filter(
        (c) => c.type === "text"
      ).size;
      const noOfVoiceChannels = guild.channels.cache.filter(
        (c) => c.type === "voice"
      ).size;
      const noOfCatego = guild.channels.cache.filter(
        (c) => c.type === "category"
      ).size;
      const noOfNewsChannels = guild.channels.cache.filter(
        (c) => c.type === "news"
      ).size;
      const region = capitalize(guild.region);
      const name = guild.name;
      const serverId = guild.id;
      const roleCount = guild.roles.cache.size;
      const emojiCount = guild.emojis.cache.size;
      const guildId = guild.id;
      const noOfChannel = guild.channels.cache.filter(
        (c) => c.type !== "category"
      ).size;

      const thumbnail = guild.iconURL({
        dynamic: true,
        format: "png",
        size: 1024,
      });
      let partnered;
      let verified;
      guild.partnered ? (partnered = "Yes") : (partnered = "No");
      guild.verified ? (verified = "Yes") : (verified = "No");
      const created = guild.createdTimestamp;
      const totalMembers = guild.members.cache.filter(
        (member) => !member.user.bot
      ).size;
      const onlineMembers = guild.members.cache.filter(
        (member) => member.presence.status == "online"
      ).size;
      const offlineMembers = guild.members.cache.filter(
        (member) => member.presence.status == "offline"
      ).size;
      const idleMembers = guild.members.cache.filter(
        (member) => member.presence.status == "idle"
      ).size;
      const dndMembers = guild.members.cache.filter(
        (member) => member.presence.status == "dnd"
      ).size;
      const bots = guild.members.cache.filter((member) => member.user.bot).size;
      const desc = guild.description;
      const features = guild.features;

      const owner = `${guild.owner.user.username}#${guild.owner.user.discriminator}`;
      const serverinfoEmbed = new MessageEmbed()
        .setTitle(`**Information of *${name}* Server!**`)
        .setColor(config.embedColor)
        .setDescription(desc ? desc : "No Description")
        .setFooter(`Req. by ${author.tag}`)
        .setTimestamp()
        .setThumbnail(thumbnail)
        .addFields(
          {
            name: `General`,
            value: `
            :white_small_square: **Server Name :**   ${name}
            :white_small_square: **Server Id :**   ${guildId}
            :white_small_square: **Region :**  ${region}
            :white_small_square: **Owner :**   ${owner}
            :white_small_square: **Owner Id :**   ${guild.ownerID}
            :white_small_square: **Created :**  ${new Date(
              created
            ).toDateString()}
            :white_small_square: **Partnered  :**  ${partnered}
            :white_small_square: **Verified  :**  ${verified}
            :white_small_square: **Boost Level  :** ${guild.premiumTier}
            :white_small_square: **Boosts  :** ${guild.premiumSubscriptionCount}
            `,
          },
          {
            name: `Stats`,
            value: `
            :white_small_square: **Roles  :**  ${roleCount}
            :white_small_square: **Emojis  :**  ${emojiCount}
            :white_small_square: **Channels  :**  ${noOfChannel}
                --> **Text  -  **  ${noOfTextChannels}
                --> **Voice  -**  ${noOfVoiceChannels}
                --> **Announcement  -**  ${noOfNewsChannels}
                --> **Categories  -** ${noOfCatego}   `,
            inline: true,
          },
          {
            name: `Presence`,
            value: `
            :white_small_square: **Total  :**  ${guild.memberCount}
            :white_small_square: **Humans  :**  ${totalMembers}
            :white_small_square: **Bots  : **  ${bots}
            :white_small_square: **Online  :**  ${onlineMembers}
            :white_small_square: **Idle  :**  ${idleMembers}
            :white_small_square: **DND  :**  ${dndMembers}
            :white_small_square: **Invisible  :**  ${offlineMembers}`,
            inline: true,
          },
          {
            name: `Features`,
            value: `${features.join(", ")}
            `,
          }
        );
      // console.log(partnered, verified);
      // console.log(guild.features);
      message.channel.send(serverinfoEmbed);
    }
  },
};
