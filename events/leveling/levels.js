const levelSchema = require("./../../models/levelSchema");
const { badwords } = require("./../../configs/badwords.json");
const { leveling } = require("./../../configs/features.json");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (leveling.working) {
      const { guild, member } = message;

      addXp(guild.id, member.id, 13, message);
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

  if (xp >= needed) {
    ++level;
    xp -= needed;
    message.reply(`You Reached ${level} Level, keep Growing`).then((msg) => {
      msg.delete({ timeout: 3000 });
    });

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
