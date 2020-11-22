require("dotenv").config();
require("module-alias/register");

const Discord = require("discord.js");
const config = require("./configs/config.json");
const wokCommands = require("wokcommands");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.on("ready", () => {
  client.user.setActivity(config.botActivity.presence, {
    type: config.botActivity.activity,
  });
  // client.user.setStatus(config.botActivity.status);
  console.log(`${client.user.username} is ready!`);
  new wokCommands(client, "commands", "features")
    .setMongoPath(process.env.MONGO_URI)
    .setDefaultPrefix(config.prefix)
    .setSyntaxError(
      "Incorrect syntax! Please use {PREFIX}{COMMAND} {ARGUMENTS}"
    );
});

client.login(process.env.TOKEN);
