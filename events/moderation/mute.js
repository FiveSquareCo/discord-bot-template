const muteSchema = require("./../../models/muteSchema");
const levelSchema = require("./../../models/levelSchema");

module.exports = (client) => {
  const checkLevel = async () => {
    // console.log("Levels > Checking for levels");

    const results = await levelSchema.find();
    // console.log(results);
    if (results && results.length) {
      for (const result of results) {
        const { guildId, userId, level } = result;

        const guild = client.guilds.cache.get(guildId);
        const member = (await guild.members.fetch()).get(userId);
        if (!member) return;

        const role = guild.roles.cache.find((role) => {
          return role.name === `level${level}`;
        });
        if (!role) {
          return;
        }
        member.roles.add(role);
      }
    }

    setTimeout(checkLevel, 1000 * 60 * 10);
  };
  checkLevel();
  const checkMutes = async () => {
    // console.log("Mute > Checking for Mutes");
    const now = new Date();

    const conditional = {
      expires: {
        $lt: now,
      },
      current: true,
    };

    const results = await muteSchema.find(conditional);
    // console.log("results:", results);

    if (results && results.length) {
      for (const result of results) {
        const { guildId, userId } = result;

        const guild = client.guilds.cache.get(guildId);
        const member = (await guild.members.fetch()).get(userId);

        const mutedRole = guild.roles.cache.find((role) => {
          return role.name === "Muted";
        });

        member.roles.remove(mutedRole);
      }

      await muteSchema.updateMany(conditional, {
        current: false,
      });
    }

    setTimeout(checkMutes, 1000 * 60 * 10);
  };
  checkMutes();

  client.on("guildMemberAdd", async (member) => {
    const { guild, id } = member;

    const currentMute = await muteSchema.findOne({
      userId: id,
      guildId: guild.id,
      current: true,
    });

    if (currentMute) {
      const role = guild.roles.cache.find((role) => {
        return role.name === "Muted";
      });

      if (role) {
        member.roles.add(role);
      }
    }
  });
};
module.exports.config = {
  displayName: "mute",
  dbName: "mute",
};
