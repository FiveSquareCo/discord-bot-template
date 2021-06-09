const { MessageEmbed } = require("discord.js");
const { writeFile, unlink } = require("fs");
const levelSchema = require("../../models/levelSchema");
const { leave_logs } = require("../../configs/logs.json");
module.exports = (client) => {
  client.on("guildMemberRemove", async (member) => {
    const results = await levelSchema.findOneAndRemove({
      userId: member.id,
      guildId: member.guild.id,
    });
    // const fileName = `./levelingData_${
    //   member.user.tag
    // }_${new Date().toDateString()}.txt`;
    // if (results) {
    //   const data = `Note: This Below Data is Deleted From Database because user has Left the server, this the backup for that data.\n\n${results}`;
    //   writeFile(fileName, data, (e) => {
    //     null;
    //   });
    // }
    if (!leave_logs.working || leave_logs.channel_ID === "channel_id_here")
      return;
    const logChannel = client.channels.cache.get(leave_logs.channel_ID);
    const leaveEmbed = new MessageEmbed()
      .setColor(client.embedColor)
      .setAuthor("Leave Logs")
      .setDescription(
        `**${member.user.tag}** Just Left The Server! and Deleted his Leveling Data from Database`
      )
      .addFields({
        name: "Leveing Data",
        value: `\`\`\`${results}\`\`\``,
      })
      .setTimestamp();
    logChannel.send(leaveEmbed);
  });
};

module.exports.config = {
  displayName: "leave",
  dbName: "leave",
};
