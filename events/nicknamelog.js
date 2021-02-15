const { nickname_logs } = require("../configs/logs.json");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../configs/config.json");

module.exports = async (client) => {
  client.on("guildMemberUpdate", async (oldm, newm) => {
    if (nickname_logs.working) {
      let channelId;
      if (nickname_logs.channel_ID === "channel_id_here") return;
      if (nickname_logs.channel_ID != "channel_id_here") {
        channelId = nickname_logs.channel_ID;
      }
      if (oldm.nickname === newm.nickname) return;

      const oldNick = oldm.nickname;
      const newNick = newm.nickname;

      const nicknameLog = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor("Nickname logs")
        .setDescription(
          `
          **Old Nickname  : ** ${oldNick}
          **New Nickname  : ** ${newNick}
          `
        )
        .addFields({
          name: "Used By :",
          value: `<@${oldm.id}>`,
        })
        .setTimestamp();
      const channel = oldm.guild.channels.cache.get(channelId);
      channel.send(nicknameLog);
    }
  });
};

module.exports.config = {
  displayName: "nickname-logs",
  dbName: "nickname-logs",
};
