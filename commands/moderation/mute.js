const { MessageEmbed } = require("discord.js");
const muteSchema = require("@schema/muteSchema");

const reasons = {
  BADWORD: 5,
  SPAMMING: 10,
  ADVERTISING: 24,
};

module.exports = {
  name: "mute",
  commands: ["mute"],
  aliases: ["m"],
  description: "Muting a User",
  minArgs: 2,
  maxArgs: 2,
  category: "moderation",
  cooldown: "5s",
  requiredPermissions: ["ADMINISTRATOR"],
  expectedArgs:
    "{PREFIX}mute <@ user-id> <reason- SPAMMING/BADWORD/ADVERTISING>",
  callback: async (message, args) => {
    const staff = message.author;
    const target = message.mentions.users.first();
    if (!target) {
      return message.reply("please Mention Someone to mute");
    }
    const reason = args[1].toUpperCase();
    if (!reasons[reason]) {
      let validReasons = " ";
      for (const key in reasons) {
        validReasons += `${key}, `;
      }
      validReasons = validReasons.substr(0, validReasons.length - 2);

      message.reply(`please Specify a reason from the below ones,
        ${validReasons}`);
      return;
    }
    const prevMutes = await muteSchema.find({
      userId: target.id,
    });
    const curMute = prevMutes.filter((mute) => {
      return mute.current === true;
    });

    if (curMute.length) {
      message.reply(`The Mentioned user is already muted.`);
      return;
    }
    let duration = reasons[reason] * (prevMutes.length + 1);

    const expires = new Date();

    expires.setHours(expires.getHours() + duration);

    const muteRole = message.guild.roles.cache.find((role) => {
      return role.name === "Muted";
    });
    if (!muteRole) {
      message.reply(`There Is No role With Name Muted`);
      return;
    }
    const targetMember = (await message.guild.members.fetch()).get(target.id);
    targetMember.roles.add(muteRole);

    await new muteSchema({
      userId: target.id,
      guildId: message.guild.id,
      reason,
      staffId: staff.id,
      staffTag: staff.tag,
      expires,
      current: true,
    }).save();

    message.reply(
      `Muted <@${target.id}> and they will be un muted in ${duration} hours`
    );
  },
};
