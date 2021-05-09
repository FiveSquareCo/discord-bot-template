const { MessageEmbed } = require("discord.js");
const { writeFileSync } = require("fs");
module.exports = {
  ownerOnly: true,
  name: "setleavemessage",
  requiredPermissions: ["ADMINISTRATOR"],
  callback: ({ message, prefix, client, channel }) => {
    const text = message.content.replace(`${prefix}setleavemessage`, "");
    console.log("TEXT:", text);
    try {
      const message = text.replace("SETUP", "");
      const welcomeMEssage = JSON.stringify(message);
      const replyWM = JSON.parse(welcomeMEssage);
      writeFileSync("./messages/leave.json", welcomeMEssage, "utf8");
      const welcomeMessageSet = new MessageEmbed()
        .setTitle("Leave Message Set")
        .setColor(client.embedColor)
        .setDescription(`**Welcome Message  :**${replyWM}`)
        .setTimestamp();
      return channel.send(welcomeMessageSet);
    } catch (error) {
      console.log(error);
    }
  },
};
