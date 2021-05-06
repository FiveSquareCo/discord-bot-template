const { voice_logs } = require("../../configs/logs.json");
const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
  client.on("voiceStateUpdate", (oS, nS) => {
    if (!voice_logs.working || voice_logs.channel_ID === "channel_id_here") {
      return;
    }
    const logsChannel = client.channels.cache.get(voice_logs.channel_ID);
    let u = nS.member.user.tag;
    if (!oS.streaming && nS.streaming) {
      const startedStreamingEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTitle("Started Streaming")
        .setTimestamp()
        .setDescription(
          `**${u}** Started Streaming/Sharing Their Screen in ${nS.channel.id}`
        );
      return logsChannel.send(startedStreamingEmbed);
    }
    if (oS.streaming && !nS.streaming) {
      const endedStreamingEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTitle("Stopped Streaming")
        .setTimestamp()
        .setDescription(
          `**${u}** Stopped Streaming/Sharing Their Screen in <#${nS.channel.id}>`
        );
      return logsChannel.send(endedStreamingEmbed);
    }
    if (!oS.serverDeaf && nS.serverDeaf) {
      const serverDefenYesEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTitle("Server Deafen")
        .setTimestamp()
        .setDescription(`**${u}** got Server Deafened in <#${nS.channel.id}>`);
      return logsChannel.send(serverDefenYesEmbed);
    }
    if (oS.serverDeaf && !nS.serverDeaf) {
      const serverDefenNoEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTitle("Server Un Deafen")
        .setTimestamp()
        .setDescription(
          `**${u}** got Server Un Deafened in <#${nS.channel.id}>`
        );
      return logsChannel.send(serverDefenNoEmbed);
    }
    if (!oS.serverMute && nS.serverMute) {
      const serverMuteYesEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTitle("Server Mute")
        .setTimestamp()
        .setDescription(`**${u}** got Server Muted in <#${nS.channel.id}>`);
      return logsChannel.send(serverMuteYesEmbed);
    }
    if (oS.serverMute && !nS.serverMute) {
      const serverMuteNoEmbed = new MessageEmbed()
        .setTitle("Server Un Mute")
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(`**${u}** got Server Un Muted in <#${nS.channel.id}>`);
      return logsChannel.send(serverMuteNoEmbed);
    }
    if (!oS.selfDeaf && nS.selfDeaf) {
      const deafendThemSelvesEmbed = new MessageEmbed()
        .setTitle("Self Deafen")
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(`**${u}** Deafened themselves in <#${nS.channel.id}>`);
      return logsChannel.send(deafendThemSelvesEmbed);
    }
    if (oS.selfDeaf && !nS.selfDeaf) {
      const uNdeafendThemSelvesEmbed = new MessageEmbed()
        .setTitle("Self Un Deafen")
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(
          `**${u}** Un Deafened themselves in <#${nS.channel.id}>`
        );
      return logsChannel.send(uNdeafendThemSelvesEmbed);
    }
    if (!oS.selfMute && nS.selfMute) {
      const mutedThemSelvesEmbed = new MessageEmbed()
        .setTitle("Self Mute")
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(`**${u}** Muted themselves in <#${nS.channel.id}>`);
      return logsChannel.send(mutedThemSelvesEmbed);
    }
    if (oS.selfMute && !nS.selfMute) {
      const unMutedThemSelvesEmbed = new MessageEmbed()
        .setTitle("Self Un Mute")
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(`**${u}** Un Muted themselves in <#${nS.channel.id}>`);
      return logsChannel.send(unMutedThemSelvesEmbed);
    }
    if (!oS.selfVideo && nS.selfVideo) {
      const cameraOnEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle("Camera On")
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(
          `**${u}** Turned Their Camera on in <#${nS.channel.id}>`
        );
      return logsChannel.send(cameraOnEmbed);
    }
    if (oS.selfVideo && !nS.selfVideo) {
      const cameraOffEmbed = new MessageEmbed()
        .setTitle("Camera Off")
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(
          `**${u}** Turned Their Camera off in <#${nS.channel.id}>`
        );
      return logsChannel.send(cameraOffEmbed);
    }
    if (!oS.channelID && nS.channelID) {
      const joinedChannelEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle("Voice Channel Join")
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(`**${u}** joined <#${nS.channel.id}>`);
      return logsChannel.send(joinedChannelEmbed);
    }
    if (oS.channelID && !nS.channelID) {
      const leftChannelEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setTitle("Voice Channel Leave")
        .setDescription(`**${u}** Left <#${oS.channel.id}>`);
      return logsChannel.send(leftChannelEmbed);
    }
    if (oS.channelID && !nS.channelID) {
      const switchedChannelEmbed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle("Voice Channel Switch")
        .setAuthor("Voice Logs")
        .setTimestamp()
        .setDescription(
          `**${u}** Switched from <#${oS.channel.id}> to <#${nS.channel.id}>`
        );
      return logsChannel.send(switchedChannelEmbed);
    }
  });
};

module.exports.config = {
  displayName: "voiceLogs",
  dbName: "voiceLogs",
};
