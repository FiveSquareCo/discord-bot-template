const { MessageEmbed } = require("discord.js");
const config = require("../../configs/config.json");
const { info } = require("../../configs/commands.json");
module.exports = {
  name: "roleinfo",
  category: "info",
  commands: ["roleinfo", "ri", "inforole"],
  requiredPermissions: ["MANAGE_ROLES"],
  description: "information about role",
  callback: async ({ message }) => {
    const { author, guild } = message;
    // console.log(author.presence.activities);
    const ticks = "```";
    if (info.roleinfo.working) {
      const rolem = message.mentions.roles.first();
      if (rolem) {
        const roleinfo = message.guild.roles.cache.get(rolem.id);
        // console.log(roleinfo);
        const userInfoembed = new MessageEmbed()
          .setTitle(`**Information of Role *${roleinfo.name}* !**`)
          .setColor(config.embedColor)
          .setFooter(`Req. by ${author.tag}`)
          .setTimestamp().setDescription(`
        :white_small_square: **Role ID  :**  ${roleinfo.id}
        :white_small_square: **Role Name  :** ${roleinfo.name}
        :white_small_square: **Color:** ${roleinfo.hexColor}
        :white_small_square: **Mentionable  :** ${
          roleinfo.mentionable ? "yes" : "No"
        }
        :white_small_square: **Created At  :** ${new Date(
          roleinfo.createdTimestamp
        ).toDateString()}
        :white_small_square: **Display Seperatly  :**  ${
          roleinfo.hoist ? "yes" : "No"
        }
        :white_small_square: **Permissions  :** ${ticks}${roleinfo.permissions.toArray()}${ticks}`);
        message.channel.send(userInfoembed);
      }
      //   console.log(role);
    }
  },
};
