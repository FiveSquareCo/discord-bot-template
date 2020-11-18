const Discord = require("discord.js");
const modMailConfig = require("../configs/features.json");
module.exports = (client) => {
  client.on("message", (message) => {
    const channelId = client.channels.cache.get(modMailConfig.modMail.modmail);
    if (message.author.bot) return;
    if (message.channel.type === "dm") {
      message
        .reply("our mods will contact you very soon")
        .then(channelId.send("dm"));
      return;
    }
  });
};
