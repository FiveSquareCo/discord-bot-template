const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../../configs/config.json");
module.exports = {
  name: "ping",
  category: "misc",
  commands: ["ping", "p", "Latency"],
  description: "Gives Bot's Latency/Ping",
  callback: async ({ message, args, text, client, prefix, instance }) => {
    message.channel.send(":timer: Caliculating Ping ...").then((msg) => {
      const ping = msg.createdTimeStamp - message.createdTimeStamp;
      const PingEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setTitle("Ping/Latency")
        .setTimestamp()
        .setDescription(
          `
              :ping_pong: BOT Ping : ${ping}

              :timer: API ping : ${client.ws.ping}
              `
        );

      msg.edit(PingEmbed);
    });
  },
};
