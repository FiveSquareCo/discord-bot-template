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
  const messagesPath = "./messages.json";
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  new wokCommands(client, {
    commandsDir: "commands",
    featureDir: "events",
    messagesPath,
    showWarns: true, // Show start up warnings
    dbOptions,
  })
    .setMongoPath(process.env.MONGO_URI)
    .setDefaultPrefix(config.prefix);
  console.log(`${client.user.username} is ready!`);
});

client.login(process.env.TOKEN);
