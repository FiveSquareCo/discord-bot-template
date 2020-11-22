const { MessageEmbed } = require("discord.js");
const config = require("@config/config.json");
const { info } = require("@config/commands.json");
module.exports = {
  name: "roleinfo",
  commands: ["roleinfo", "ri", "inforole", "ir", "roleinformation"],
  minArgs: 1,
  maxArgs: 1,
  syntaxError:
    "Incorrect Usage! Use `{PREFIX}roleinfo <role-id or mention role>`",
  description: "information about role",
  callback: (message, args) => {
    if (info.roleinfo.working) {
      //   const role = message.mentios.roles.first();
      //   console.log(role);
      message.reply(`Under Development!`);
    }
  },
};
