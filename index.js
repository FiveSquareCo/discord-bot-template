require("dotenv").config();
require("module-alias/register");

const Discord = require("discord.js");
const config = require("./configs/config.json");
const wokCommands = require("wokcommands");

const client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity("discord.js", { type: "WATCHING" });
  console.log("Five Square Bot Ready...");
  new wokCommands(client, "commands", "features")
    .setMongoPath(process.env.MONGO_URI)
    .setDefaultPrefix(config.prefix)
    .setSyntaxError(
      "Incorrect syntax! Please use {PREFIX}{COMMAND} {ARGUMENTS}"
    );
});

client.login(process.env.TOKEN);
