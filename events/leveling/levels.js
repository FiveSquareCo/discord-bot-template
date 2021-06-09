const levelSchema = require("./../../models/levelSchema");
const { badwords } = require("./../../configs/badwords.json");
const { leveling } = require("./../../configs/features.json");
const {
  levelRewards,
  levelUpnotification,
  xpPerMessage,
} = require("../../configs/levels.json");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../../configs/config.json");
module.exports = (client) => {
  client.on("message", async (message) => {
    if (leveling.working) {
      const { guild, member } = message;

      addXp(guild.id, member.id, xpPerMessage, message);
    }
  });
};

const xpToLevel = (level) => level * level * 100;

const addXp = async (guildId, userId, xpToAdd, message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("+" || "-" || "!" || "$" || "." || ">")) {
    return;
  }
  if (message.content.length < 3) return;
  let i;
  let wordUsed;
  let badwordUse = false;
  for (i = 0; i < badwords.length; i++) {
    if (message.content.toLowerCase().includes(badwords[i].toLowerCase())) {
      badwordUse = true;
    }
  }
  if (badwordUse) {
    return;
  }
  const result = await levelSchema.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $inc: {
        xp: xpToAdd,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

  let { xp, level } = result;
  const needed = xpToLevel(level);
  const addRoleByLevel = async (level) => {
    const rewardsArray = levelRewards.rewards;
    for (let i = 0; i < rewardsArray.length; i++) {
      const key = Object.keys(rewardsArray[i])[0];
      if (key === `${level}`) {
        const role = message.guild.roles.cache.get(`${rewardsArray[i][key]}`);
        const member = message.guild.members.cache.get(userId);
        member.roles.add(role);
      }
    }
  };

  if (xp >= needed) {
    ++level;
    xp -= needed;
    if (
      levelRewards.working &&
      levelRewards.rewards[0][1] != "reward_role_id"
    ) {
      addRoleByLevel(level);
    }
    if (levelUpnotification.working) {
      if (levelUpnotification.channel.message_reply) {
        message
          .reply(`You Reached ${level} Level, keep Growing`)
          .then((msg) => {
            msg.delete({ timeout: 3000 });
          });
      }
      const dif = levelUpnotification.channel.diffrent;
      if (dif.working && dif.channel_ID != "levelup_message_channel_id") {
        const channel = message.guild.channels.cache.get(dif.channel_ID);
        if (dif.message_type === "embed") {
          const levelUpEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(message.author.username)
            .setFooter(message.guild.name)
            .setDescription(
              `
             **CONGRATS**
             You are now level **${level}**!!!
             `
            );
          channel
            .send(`<@${userId}>`)
            .then((msg) => msg.channel.send(levelUpEmbed));
        }
        if (dif.message_type === "text") {
          message.reply(`You Reached ${level} Level, keep Growing`);
        }
      }
    }

    await levelSchema.updateOne(
      {
        guildId,
        userId,
      },
      {
        level,
        xp,
      }
    );
  }
};

module.exports.addXp = addXp;
module.exports.config = {
  displayName: "levels",
  dbName: "levels",
};
