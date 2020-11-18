const warnSchema = require("../../models/warnSchema");

module.exports = {
  name: "warn",
  commands: ["warn"],
  aliases: ["w"],
  description: "Warn a User",
  minArgs: 2,
  syntaxError: "Incorrect syntax! Use `{PREFIX}mute <@ user-id> <reason>`",
  callback: async (message, args) => {
    const target = message.mentions.users.first();
    if (!target) {
      message.reply("please mention someone to warn");
      return;
    }
    args.shift();
    const guildId = message.guild.id;
    const userId = target.id;
    const reason = args.join(" ");
    // console.log(guildId, userId, reason);
    const warning = {
      givenById: message.author.id,
      ggivenByName: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    };
    await warnSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $push: {
          warnings: warning,
        },
      },
      {
        upsert: true,
      }
    );
  },
};
